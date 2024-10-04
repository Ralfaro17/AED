import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { ChevronRight, Search, Heart, Library, List, Mic2, Play, Plus, Repeat, SkipBack, SkipForward, Volume2, X, Clock, Minus, Music } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useForm } from 'react-hook-form';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select';
import Swal from 'sweetalert2';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


// Función para guardar una playlist en localStorage
const savePlaylistToLocalStorage = (playlistName, songs = []) => {
  const existingPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
  const newPlaylist = { name: playlistName, songs: songs };
  const updatedPlaylists = [...existingPlaylists, newPlaylist];
  localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
};

// Función para cargar las playlists de localStorage
const loadPlaylistsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('playlists')) || [];
};

///para evitarme la fatiga
const CLIENT_ID = '7a941c5d29194cd98724bbb2a9554614';
const CLIENT_SECRET = 'd642147eea754344ade62162becf715c';
function MusicStreamingApp() {

  const [nowPlaying, setNowPlaying] = useState(null); // La canción actual en reproducción
  const [queue, setQueue] = useState([]); // La lista temporal de reproducción
  const [history, setHistory] = useState(() => {
    // Recuperar el historial del localStorage al cargar la aplicación
    const storedHistory = localStorage.getItem('playbackHistory');
    return storedHistory ? JSON.parse(storedHistory) : [];
  });
  const { register, handleSubmit, watch } = useForm();
  const [searchType, setSearchType] = useState("Todo");

  const [isOpen, setIsOpen] = useState(false); // Controla si el diálogo está abierto
  const [isOpenDELETE, setIsOpenDELETE] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  const [tempPlaylist, setTempPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [playlistName, setPlaylistName] = useState(''); // Guarda el nombre de la playlist
  const [playlists, setPlaylists] = useState([]); // Estado para almacenar las playlists
  const addPlaylist = (newPlaylist) => {
    setTempPlaylist(newPlaylist);
    setCurrentTrackIndex(0); // Reinicia el índice al agregar una nueva lista
  };


  const [searchResults, setSearchResults] = useState({
    artists: [],
    albums: [],
    tracks: [],
  });
  const [accessToken, setAccessToken] = useState("");

  const busquedaDis = watch("search"); // se obtiene el valor actual del input
  const onSubmit = (data) => {
    console.log("Buscando:", data.search);
    search(data.search);  // Pasar la búsqueda al método search
  };

  useEffect(() => {
    console.log("El usuario está buscando:", busquedaDis);
    // Obtener token de autenticación
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    };
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
      .catch(error => console.error('Error fetching access token:', error));
  }, []);

  useEffect(() => {
    document.title = "Reproductor de música";
  })

  function formatDuration(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  }
  //search
  async function search(query) {
    console.log("Buscando por: " + query);

    // Parámetros de la petición
    const searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
    };

    // Define el endpoint de búsqueda dependiendo del tipo
    let searchQuery = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&limit=5`;

    // Cambia el endpoint según el tipo de búsqueda
    if (searchType === "Artistas") {
      searchQuery += "&type=artist";
    } else if (searchType === "Canciones") {
      searchQuery += "&type=track"; // Cambiar a "track" para canciones
    } else if (searchType === "Álbumes") {
      searchQuery += "&type=album"; // Cambiar a "album" para álbumes
    } else {
      searchQuery += "&type=artist,track,album"; // Para "Todo", busca en todos los tipos
    }

    try {
      const response = await fetch(searchQuery, searchParameters);
      const data = await response.json();
      console.log(data);

      // Actualiza el estado con los resultados obtenidos
      setSearchResults({
        artists: data.artists?.items || [],
        albums: data.albums?.items || [],
        tracks: data.tracks?.items || [],
      });
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  }

  // cola historial reproduccin

  // Función para guardar el historial en localStorage
  const saveHistoryToLocalStorage = (updatedHistory) => {
    localStorage.setItem('playbackHistory', JSON.stringify(updatedHistory));
  };

  const handlePlaySong = (track) => {
    setNowPlaying(track); // Establece el track actual en reproducción
    setQueue([track]); // Reinicia la cola con la canción actual

    // Actualizar el historial y guardarlo en localStorage
    const updatedHistory = [...history, track];
    setHistory(updatedHistory);
    saveHistoryToLocalStorage(updatedHistory); // Guarda en localStorage
  };

  const handleAddToQueue = (track) => {
    // Si la canción que se intenta reproducir ya es la que está en reproducción
    if (isPlaying && tempPlaylist[currentTrackIndex]?.id === track.id) {
      // La canción ya está en reproducción, así que simplemente agrega el siguiente track a la cola
      return; // No hacer nada si ya está reproduciendo esta canción
    }
    
    // Si no hay track en reproducción o si se selecciona una nueva canción
    if (!isPlaying) {
      handlePlaySong(track); // Asegúrate de que handlePlaySong esté definido
      setTempPlaylist([track]); // Establece la lista temporal con esta canción
      setCurrentTrackIndex(0); // Comienza desde esta pista
      setIsPlaying(true);
    } else {
      // Si hay una canción en reproducción y se selecciona una nueva canción, se agrega a la cola
      setQueue((prevQueue) => [...prevQueue, track]); // Actualiza la cola en tiempo real
      console.log(prevQueue);
    }
  };
  
  // Función para manejar la acción de reproducción y cola
  const handleSongAction = (track) => {
    handleAddToQueue(track);
  };
  

  // Función para obtener información del artista
  const fetchArtistInfo = async (artistId) => {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
      },
    });
    return await response.json();
  };

  // Función para obtener las canciones más populares del artista
  const fetchTopTracks = async (artistId) => {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
      },
    });
    const data = await response.json();
    return data.tracks.slice(0, 5); // Retorna solo las 5 mejores canciones
  };

  // Función para obtener los álbumes del artista
  const fetchAlbums = async (artistId) => {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
      },
    });
    const data = await response.json();
    return data.items;
  };



  const handleArtistInfo = async (artistId) => {
    try {
      // Aquí asumes que tienes una función para obtener la información del artista
      const artistData = await fetchArtistInfo(artistId);

      Swal.fire({
        title: artistData.name,
        html: `
          <p>Información sobre el artista...</p>
          <h3>Top 5 Tracks:</h3>
          <ul>${artistData.topTracks.map(track => `<li>${track.name} - ${track.album.name}</li>`).join('')}</ul>
          <h3>Álbumes:</h3>
          <ul>${artistData.albums.map(album => `<li>${album.name} (${new Date(album.release_date).getFullYear()})</li>`).join('')}</ul>
        `,
        showCloseButton: true,
        focusConfirm: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo obtener la información del artista.',
      });
    }
  };


  // Función para mostrar las 5 mejores canciones del artista
  const handleTopTracks = async (artistId) => {
    try {
      const topTracks = await fetchTopTracks(artistId);
      const topTracksList = topTracks.map(track => `<li>${track.name}</li>`).join('');

      Swal.fire({
        title: 'Top 5 Tracks',
        html: `<ul>${topTracksList}</ul>`,
        showCloseButton: true,
        focusConfirm: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo obtener las canciones más populares.',
      });
    }
  };


  const handleAlbums = async (artistId) => {
    try {
      const albums = await fetchAlbums(artistId);
      const albumsList = albums.map(album => `<li>${album.name} (${new Date(album.release_date).getFullYear()})</li>`).join('');

      Swal.fire({
        title: 'Álbumes',
        html: `<ul>${albumsList}</ul>`,
        showCloseButton: true,
        focusConfirm: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo obtener los álbumes del artista.',
      });
    }
  };

  const fetchAlbumTracks = async (albumId) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
        headers: {
          'Authorization': 'Bearer ' + accessToken, // Asegúrate de que accessToken esté definido y válido
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener las pistas del álbum');
      }

      const albumData = await response.json();
      return albumData.items; // Cambia `tracks.items` a `items`
    } catch (error) {
      console.error('Error fetching album tracks:', error);
      return []; // Retorna un arreglo vacío en caso de error
    }
  };
  const handleAddAlbumToPlaylist = async (album) => {
    const albumId = album.id; // Captura el ID del álbum
    const playlistName = `Playlist - ${album.name}`;

    // Función para obtener las pistas del álbum
    const fetchAlbumTracks = async (albumId) => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, { // Asegúrate de que la URL sea correcta
          headers: {
            'Authorization': 'Bearer ' + accessToken, // Asegúrate de que accessToken esté definido y válido
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener las pistas del álbum');
        }

        const albumData = await response.json();
        return albumData.items; // Cambia `tracks.items` a `items`
      } catch (error) {
        console.error('Error fetching album tracks:', error);
        return []; // Retorna un arreglo vacío en caso de error
      }
    };

    // Obtén las pistas del álbum
    const tracks = await fetchAlbumTracks(albumId);

    // Verifica si se obtuvieron las pistas
    if (tracks.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron obtener las pistas del álbum.',
      });
      return;
    }

    // Crea la estructura de la playlist
    const playlist = {
      id: album.id,
      name: playlistName,
      description: `Playlist creada con el álbum: ${album.name}`,
      tracks: tracks.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists.map(artist => artist.name).join(', '),
        album: album.name,
        preview_url: track.preview_url, // Agrega el preview_url
        track_number: track.track_number, // Agrega el número de pista
        type: track.type, // Agrega el tipo
        uri: track.uri, // Agrega el URI
      })),
    };

    const createTemporaryPlaylist = async (albumId) => {
      try {
        const tracks = await fetchAlbumTracks(albumId);
        const currentTrack = tempPlaylist[currentTrackIndex]; // Llama a la función para obtener las pistas del álbum

        // Verifica si se obtuvieron las pistas
        if (tracks.length === 0) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron obtener las pistas del álbum.',
          });
          return;
        }

        // Establece la lista temporal
        const temporaryPlaylist = tracks.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists.map(artist => artist.name).join(', '),
          album: track.album.name, // Asegúrate de que esto esté disponible
          preview_url: track.preview_url,
          track_number: track.track_number,
          type: track.type,
          uri: track.uri,
        }));

        setTempPlaylist(temporaryPlaylist); // Establece la lista temporal
        setCurrentTrackIndex(0); // Reinicia el índice a 0
        Swal.fire({
          title: 'Éxito',
          text: 'La lista temporal de reproducción ha sido creada.',
          icon: 'success',
        });

      } catch (error) {
        console.error('Error al crear la lista temporal de reproducción:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo crear la lista temporal de reproducción.',
        });
      }
    };


    // Guardar la lista de reproducción en localStorage
    let playlists = JSON.parse(localStorage.getItem('playlists')) || [];
    playlists.push(playlist); // Agrega la nueva playlist al arreglo
    localStorage.setItem('playlists', JSON.stringify(playlists)); // Guarda el arreglo actualizado
    setTempPlaylist(album.tracks); // Llena la lista temporal con las canciones del álbum
    setCurrentTrackIndex(0); // Reinicia el índice a 0 para empezar desde la primera canción
    // Mensaje de éxito
    Swal.fire({
      title: 'Éxito',
      text: `Se ha creado la playlist: ${playlistName} con las canciones del álbum.`,
      icon: 'success',

    });
    console.log(playlist);
    console.log(Get)
  };

  const loadPlaylists = () => {
    const savedPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
    setPlaylists(savedPlaylists);
  };

  // Llama a loadPlaylists cuando se monta el componente
  useEffect(() => {
    loadPlaylists();
    console.log(playlists);
    const savedPlaylists = JSON.parse(localStorage.getItem('playlists'));
    if (savedPlaylists) {
      setPlaylists(savedPlaylists);
    }

  }, []);
  //mensaje para crar una playlist
  const handleCreatePlaylist = () => {
    if (playlistName.trim() === "") return; // Evita que se cree una playlist sin nombre

    // Crear una nueva playlist
    const newPlaylist = {
      name: playlistName,
      songs: [] // Inicia una playlist vacía
    };

    // Actualiza el estado de playlists
    const updatedPlaylists = [...playlists, newPlaylist];
    setPlaylists(updatedPlaylists);

    // Guarda en localStorage
    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));

    // Limpia el input y cierra el diálogo
    setPlaylistName('');
    setIsOpen(false);
  };
  const updatedPlaylists = playlists.map(playlist => {
    if (playlist.name === selectedPlaylist) {
      // Verificar si la propiedad tracks existe
      if (!playlist.tracks) {
        playlist.tracks = []; // Si no existe, inicialízalo
      }

      // Verificar si la canción ya está en la playlist
      const isTrackInPlaylist = playlist.tracks.some(existingTrack => existingTrack.id === track.id);

      if (isTrackInPlaylist) {
        Swal.showValidationMessage('La canción ya está en esta playlist.');
        return playlist; // No se hace nada si ya está en la playlist
      } else {
        // Agregar la canción a la playlist
        playlist.tracks.push(track); // Asegúrate de que 'track' tenga un 'id'
      }
    }
    return playlist; // Devuelve la playlist actualizada
  });


  const handleAddToPlaylist = (track) => {
    const playlistNames = playlists.map(playlist => playlist.name);

    // SweetAlert para seleccionar la playlist
    Swal.fire({
      title: 'Selecciona una Playlist',
      input: 'select',
      inputOptions: {
        playlists: playlistNames.reduce((options, name) => {
          options[name] = name;
          return options;
        }, {})
      },
      inputPlaceholder: 'Selecciona una lista',
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
      preConfirm: (selectedPlaylist) => {
        if (!selectedPlaylist) {
          Swal.showValidationMessage('Seleccione una playlist para agregar la canción');
          return null; // Retorna null si no se seleccionó nada
        }

        const updatedPlaylists = playlists.map(playlist => {
          if (playlist.name === selectedPlaylist) {
            // Asegúrate de que tracks esté inicializado
            if (!playlist.tracks) {
              playlist.tracks = [];
            }

            // Verificar si la canción ya está en la playlist
            const isTrackInPlaylist = playlist.tracks.some(existingTrack => existingTrack.id === track.id);

            if (isTrackInPlaylist) {
              Swal.showValidationMessage('La canción ya está en esta playlist.');
              return playlist; // No se hace nada si ya está en la playlist
            } else {
              // Agregar la canción a la playlist
              playlist.tracks.push({
                id: track.id,
                name: track.name,
                artist: track.artists.map(artist => artist.name).join(', '),
                album: track.album.name, // Asumiendo que el álbum ya está disponible
                preview_url: track.preview_url, // Agrega el preview_url
                track_number: track.track_number, // Agrega el número de pista
                type: track.type, // Agrega el tipo
                uri: track.uri, // Agrega el URI
              });
            }
          }
          return playlist; // Devuelve la playlist actualizada
        });

        setPlaylists(updatedPlaylists); // Actualiza el estado
        localStorage.setItem('playlists', JSON.stringify(updatedPlaylists)); // Guarda en localStorage
        Swal.fire('Éxito', 'La canción ha sido agregada a la playlist.', 'success');
      }
    });
  };


  const handleDeletePlaylist = () => {
    const playlistNames = playlists.map(playlist => playlist.name);

    // SweetAlert para seleccionar la playlist
    Swal.fire({
      title: 'Eliminar Playlist',
      input: 'select',
      inputOptions: {
        playlists: playlistNames.reduce((options, name) => {
          options[name] = name; // Mapeo de nombres de playlist
          return options;
        }, {})
      },
      inputPlaceholder: 'Seleccione una lista',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      preConfirm: (selectedPlaylist) => {
        if (!selectedPlaylist) {
          Swal.showValidationMessage('Seleccione una playlist para eliminar');
        } else {
          // Lógica para eliminar la playlist
          const updatedPlaylists = playlists.filter(playlist => playlist.name !== selectedPlaylist);
          setPlaylists(updatedPlaylists);
          localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
          Swal.fire('Eliminada!', 'La playlist ha sido eliminada.', 'success');
        }
      }
    });
  };

  //reproductor
  const playNextTrack = () => {
    if (tempPlaylist.length > 0) { // Verifica que la lista no esté vacía
      if (currentTrackIndex < tempPlaylist.length - 1) {
        setCurrentTrackIndex(currentTrackIndex + 1);
      } else {
        setCurrentTrackIndex(0); // Regresar al inicio
      }
    }
  };

  const playPreviousTrack = () => {
    if (tempPlaylist.length > 0) { // Verifica que la lista no esté vacía
      if (currentTrackIndex > 0) {
        setCurrentTrackIndex(currentTrackIndex - 1);
      } else {
        setCurrentTrackIndex(tempPlaylist.length - 1); // Ir a la última pista
      }
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying); // Cambia entre reproducir y pausar
  };
  const handlePlayAlbum = async (album) => {
    const tracks = await fetchAlbumTracks(album.id); // Supón que fetchAlbumTracks es una función que ya tienes
    setTempPlaylist(tracks);
    setCurrentTrackIndex(0); // Comienza desde la primera pista
    setIsPlaying(true); // Inicia la reproducción
  };

  // Renderiza las playlists como opciones en el select

  const clearLocalStorage = () => {
    localStorage.clear(); // Limpia todo el localStorage
    console.log("El localStorage ha sido limpiado."); // Mensaje de confirmación
    setPlaylists([]); // Limpia el estado de playlists también si es necesario
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <div className="flex flex-1 overflow-hidden">

        {/* Left Panel - Playlist */}
        <div className="w-64 p-6 bg-zinc-900">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Library className="mr-2" />
              <h2 className="text-xl font-semibold">Tu biblioteca</h2>
            </div>
            <div className="flex items-center">
              <Menubar>
                <MenubarMenu>
                  <Button onClick={() => setIsOpen(true)} variant="ghost" size="icon">
                    <Plus className="h-5 w-5" />
                  </Button>
                  <Button onClick={handleDeletePlaylist} className="bg-red-500 text-white hover:bg-red-600">
                    Eliminar Playlist
                  </Button>
                  <MenubarContent>
                    <MenubarItem>
                      Crear playlist <MenubarShortcut><X className="mr-2" /></MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
              <ChevronRight />
            </div>
          </div>

          {/* mensaje para crear una playlist */}
          <div className="flex mb-0">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-white border-zinc-800">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">Crear nueva playlist</DialogTitle>
                  <DialogDescription className="text-zinc-400">
                    ¿Quieres crear una nueva playlist? Ingresa un nombre para tu playlist a continuación.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="playlist-name" className="text-right">
                      Nombre
                    </Label>
                    <Input
                      id="playlist-name"
                      value={playlistName}
                      onChange={(e) => setPlaylistName(e.target.value)}
                      className="col-span-3 bg-zinc-800 border-zinc-700 text-white"
                      placeholder="Mi nueva playlist"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="ghost"
                    onClick={() => setIsOpen(false)}
                    className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleCreatePlaylist}
                    className="bg-green-500 text-black hover:bg-green-600"
                  >
                    Crear playlist
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input className="pl-10 bg-zinc-800 border-none text-sm" placeholder="Buscar en tu biblioteca" />
          </div>
          <ScrollArea className="h-[calc(100vh-220px)]">
            <div className="space-y-4">
              {playlists.map((playlist) => (
                <Collapsible key={playlist.id} className="mb-2">
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-zinc-800 rounded-md">
                    <div className="flex items-center">
                      <Music className="mr-2 h-4 w-4" />
                      <span>{playlist.name}</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {Array.isArray(playlist.tracks) && playlist.tracks.length > 0 ? (
                      playlist.tracks.map((track) => (
                        <div key={track?.id} className="flex items-center justify-between py-2 px-2 hover:bg-zinc-800 rounded-md group">
                          <div>
                            <p className="text-sm font-medium">{track?.name || "Canción Sin Nombre"}</p>
                            <p className="text-xs text-zinc-400">{track?.artist || "Artista Desconocido"}</p>
                          </div>
                          <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400">No hay canciones en esta playlist</p>
                    )}

                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Middle Panel - Search Results */}
        <div className="flex-1 p-6 bg-zinc-900">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  className="pl-10 bg-zinc-800 border-none text-lg h-12"
                  placeholder="¿Qué quieres escuchar?"
                  {...register("search")}
                />
              </form>

            </div>
            <div className="flex space-x-2 p-4">
              {["Todo", "Artistas", "Canciones", "Álbumes"].map((tab, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${tab === searchType ? "bg-white text-black" : "bg-zinc-800 text-white"
                    }`}
                  onClick={() => {
                    setSearchType(tab); // Actualiza el tipo de búsqueda
                    search(busquedaDis); // Realiza la búsqueda con el valor actual
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>


          <ScrollArea className="h-[calc(100vh-220px)]">
            <div className={`grid ${searchType === "Canciones" ? 'grid-cols-1' : 'grid-cols-3'} gap-4 mb-8`}>
              {/* Mapeo de artistas */}

              {searchResults.artists.map((artist) => (
                <div key={artist.id} className="bg-zinc-800 p-4 rounded-lg relative group">
                  <Avatar className="h-40 w-40 mb-4">
                    <AvatarImage src={artist.images[0]?.url || `/placeholder.svg?height=160&width=160`} alt={artist.name} />
                    <AvatarFallback>{artist.name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-sm">{artist.name}</h3>
                  <p className="text-xs text-gray-400">Artista</p>
                  <Button size="icon" className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-green-500 text-black rounded-full">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Play className="h-6 w-6" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Menu</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {/* Pasar artist.id a las funciones */}
                        <DropdownMenuItem onClick={() => handleTopTracks(artist.id)}>Top 5 Tracks</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAlbums(artist.id)}>Álbumes</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Button>
                </div>
              ))}

              {/* Mapeo de álbumes */}
              {searchResults.albums.map((album) => (
                <div key={album.id} className="bg-zinc-800 p-4 rounded-lg relative group">
                  <Avatar className="h-40 w-40 mb-4">
                    <AvatarImage src={album.images[0]?.url || `/placeholder.svg?height=160&width=160`} alt={album.name} />
                    <AvatarFallback>{album.name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-sm">{album.name}</h3>
                  <p className="text-xs text-gray-400">{album.artists[0]?.name || "Artista Desconocido"}</p>
                  <Button size="icon" className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-green-500 text-black rounded-full">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Play className="h-6 w-6" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Menu</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleAddAlbumToPlaylist(album)}>
                          Agregar a Playlist
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePlayAlbum(album)}>
                          Reproducir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Button>
                </div>
              ))}


              <div className="flex flex-col">
                {/* Encabezados */}
                <div className={`grid ${searchType === "Canciones" ? 'grid-cols-1 hidden' : 'hidden'} gap-4 mb-8`}>
                  <div className="flex items-center justify-between w-full">
                    <div className="w-8 text-center">#</div>
                    <div className="flex-1 text-left">Título</div>
                    <div className="w-1/3 text-left">Álbum</div>
                    <div className="w-16 text-right"><Clock size={16} /></div>
                  </div>
                </div>


                {/* Mapeo de canciones de los resultados de búsqueda */}
                {searchResults.tracks.map((track, index) => (
                  <div key={track.id} className="flex items-center py-2 hover:bg-zinc-800 group">
                    <div className="w-8 text-center text-sm text-zinc-400 group-hover:text-white">{index + 1}</div>
                    <div className="flex-1 flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage
                          src={track.album.images[0]?.url || `/placeholder.svg?height=40&width=40`}
                          alt={track.name}
                        />
                        <AvatarFallback>{track.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium group-hover:text-white">{track.name}</div>
                        <div className="text-sm text-zinc-400">{track.artists[0]?.name || "Artista Desconocido"}</div>
                      </div>
                    </div>
                    <div className="w-1/3 text-sm text-zinc-400">{track.album.name || "Álbum Desconocido"}</div>
                    <div className="w-16 text-right text-sm text-zinc-400">{track.duration_ms ? formatDuration(track.duration_ms) : "N/A"}</div>

                    {/* Botón de menú con opciones para reproducir y agregar a cola */}
                    <Button size="icon" className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity bg-green-500 text-black rounded-full">
                      <DropdownMenu>
                        <DropdownMenuTrigger><Play className="h-6 w-6" /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleAddToPlaylist(track)}> {/* Cambiado a track */}
                            Agregar a Playlist
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSongAction(track)}>
                            Reproducir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </Button>
                  </div>
                ))}


              </div>
            </div>
          </ScrollArea>

        </div>

        {/* Right Panel - Now Playing */}
        <div className="w-96 p-6 bg-zinc-900">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {tempPlaylist.length > 0 && currentTrackIndex < tempPlaylist.length
                ? tempPlaylist[currentTrackIndex]?.name
                : "Canción Desconocida"}
            </h2>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="font-medium">
            {tempPlaylist.length > 0 && currentTrackIndex >= 0 && currentTrackIndex < tempPlaylist.length
              ? tempPlaylist[currentTrackIndex].name
              : "Canción Desconocida"}
          </p>
          <p className="text-sm text-gray-400">
            {tempPlaylist.length > 0 && currentTrackIndex >= 0 && currentTrackIndex < tempPlaylist.length
              ? tempPlaylist[currentTrackIndex].artists.map(artist => artist.name).join(', ')
              : "Artista Desconocido"}
          </p>
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="icon" className="text-green-500">
              <Heart className="h-8 w-8" />
            </Button>
          </div>
          <h4 className="font-semibold mb-2">informacion de la lista</h4>



          <ScrollArea className="h-[calc(100vh-220px)]">
            <div className="space-y-4">
              {/* Lista de reproducción actual */}
              <ul className="mb-4">
                {tempPlaylist.map((track, index) => (
                  <li key={index} className="text-gray-300 mb-1">
                    {track.name} - {track.artists.map(artist => artist.name).join(', ')}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollArea>

          <img src="/placeholder.svg?height=240&width=360" alt="Artist Info" className="w-full h-auto rounded-md" />
        </div>

      </div>

      {/* Bottom Panel - Music Player */}
      <div className="h-20 bg-zinc-900 border-t border-zinc-800 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div>
            <p className="font-medium">
              {tempPlaylist.length > 0 && currentTrackIndex < tempPlaylist.length
                ? tempPlaylist[currentTrackIndex]?.name // Asegúrate de que tempPlaylist tenga la estructura correcta
                : "Canción Desconocida"}
            </p>
            <p className="text-sm text-gray-400">
              {tempPlaylist.length > 0 && currentTrackIndex < tempPlaylist.length
                ? tempPlaylist[currentTrackIndex]?.artists.map(artist => artist.name).join(', ')
                : "Artista Desconocido"}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-4 mb-2">
            <Button variant="ghost" size="icon" onClick={playPreviousTrack}>
              <SkipBack className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" onClick={playNextTrack}>
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
          {/* Aquí puedes agregar tu slider de tiempo */}
          {/* Ejemplo de slider de tiempo */}
          {/* <Slider value={currentTime} max={duration} onChange={handleTimeChange} className="w-full" /> */}
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Mic2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Volume2 className="h-4 w-4" />
          </Button>
          <Slider defaultValue={[75]} max={100} step={1} className="w-24" />
        </div>
      </div>


    </div>
  )
}

export default MusicStreamingApp