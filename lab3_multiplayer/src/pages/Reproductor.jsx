import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { ChevronRight, Search, Heart, Library, List, Mic2, Play, Plus, Repeat, SkipBack, SkipForward, Volume2, X, Clock, Minus, Music, User, Mail, Lock, LogIn, UserPlus, Trash2, Pause, HomeIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useForm } from 'react-hook-form';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select';
import Swal from 'sweetalert2';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Skeleton } from "@/components/ui/skeleton"
import { Link } from "react-router-dom"


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


  const [history, setHistory] = useState([]);
  const { register, handleSubmit, watch } = useForm();
  const [searchType, setSearchType] = useState("Todo");

  const [isOpen, setIsOpen] = useState(false); // Controla si el diálogo está abierto
  const [isOpenDELETE, setIsOpenDELETE] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  const [duration, setDuration] = useState(0); // Duración total en segundos
  const [currentTime, setCurrentTime] = useState(0); // Tiempo actual en segundos

  const [previousQueue, setPreviousQueue] = useState([]); // Canciones ya reproducidas
  const [currentTrack, setCurrentTrack] = useState(null); // La canción actual
  const [nextQueue, setNextQueue] = useState([]); // Canciones por reproducir

  const [audio, setAudio] = useState(null); // Estado para almacenar el objeto de audio
  const [isPlaying, setIsPlaying] = useState(false); // Controla si hay una canción reproduciéndose
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false); // Estado para verificar la reproducción


  const [playlistName, setPlaylistName] = useState(''); // Guarda el nombre de la playlist
  const [playlists, setPlaylists] = useState([]); // Estado para almacenar las playlists
  const addPlaylist = (newPlaylist) => {
    setPreviousQueue([]); // Limpiar la cola anterior
    setNextQueue(newPlaylist); // Agregar todas las canciones a la cola de reproducción
    setCurrentTrack(newPlaylist[0]); // Comenzar con la primera canción
    setIsPlaying(true); // Iniciar reproducción
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
  const showHistory = () => {
    // Si el historial está vacío, mostrar un mensaje de alerta
    if (history.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Historial vacío',
        text: 'No hay canciones reproducidas en el historial.',
      });
      return;
    }
  
    // Muestra el historial temporal con SweetAlert
    Swal.fire({
      title: 'Historial de canciones reproducidas',
      html: `
        <ScrollArea className="h-[calc(100vh-220px)]">
        <ul style="text-align: left;">
          ${history.map(song => `<li>${song.name} - ${song.artists}</li>`).join('')}
        </ul>
        </ScrollArea>
      `,
      confirmButtonText: 'Cerrar',
      width: '500px', // Ajusta el tamaño si es necesario
    });
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
    const storedPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
    setPlaylists(storedPlaylists);
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

  const fetchTrackDetails = async (trackId) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
          'Authorization': 'Bearer ' + accessToken,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener los detalles de la pista');
      }

      const trackData = await response.json();
      return trackData;
    } catch (error) {
      console.error('Error fetching track details:', error);
      return null;
    }
  };
  const [trackCache, setTrackCache] = useState({});

  const getTrackDetails = async () => {
    if (currentTrack?.id && !trackCache[currentTrack.id]) {
      const trackDetails = await fetchTrackDetails(currentTrack.id);
      if (trackDetails) {
        setTrackDetails(trackDetails);
        setTrackCache(prev => ({ ...prev, [currentTrack.id]: trackDetails })); // Guarda en el cache
      }
    } else if (currentTrack?.id) {
      setTrackDetails(trackCache[currentTrack.id]); // Usa el cache
    }
  };
  const [trackDetails, setTrackDetails] = useState(null); // Estado para los detalles de la pista
  useEffect(() => {
    const getTrackDetails = async () => {
      if (currentTrack?.id) {
        const trackDetails = await fetchTrackDetails(currentTrack.id);
        if (trackDetails) {
          setTrackDetails(trackDetails);
        }
      }
    };

    getTrackDetails();
  }, [currentTrack?.id]); // Solo se activa cuando el ID de currentTrack cambia


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
      // Obtener los detalles completos del álbum
      const albumResponse = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers: {
          'Authorization': 'Bearer ' + accessToken,
        },
      });

      if (!albumResponse.ok) {
        throw new Error('Error al obtener los detalles del álbum');
      }

      const albumData = await albumResponse.json();
      const tracks = albumData.tracks.items; // Obtén las pistas

      // Agregar las imágenes del álbum a cada pista
      const tracksWithAlbumData = tracks.map(track => ({
        ...track,
        album: {
          name: albumData.name,
          images: albumData.images, // Incluye las imágenes del álbum
        },
      }));

      return tracksWithAlbumData; // Retorna las pistas con los datos del álbum
    } catch (error) {
      console.error('Error fetching album tracks:', error);
      return [];
    }
  };
  // Función para crear una playlist a partir de un álbum
  const handleAddAlbumToPlaylist = async (album) => {
    const albumId = album.id; // Captura el ID del álbum
    const playlistName = `Playlist - ${album.name}`;

    // Función para obtener las pistas del álbum
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

    // Obtén las pistas del álbum
    const tracks = await fetchAlbumTracks(albumId);

    // Verifica si se obtuvieron las pistas
    if (!Array.isArray(tracks) || tracks.length === 0) {
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

    // Guardar la lista de reproducción en localStorage
    let playlists = JSON.parse(localStorage.getItem('playlists')) || [];
    playlists.push(playlist); // Agrega la nueva playlist al arreglo
    localStorage.setItem('playlists', JSON.stringify(playlists)); // Guarda el arreglo actualizado

    // Mensaje de éxito
    Swal.fire({
      title: 'Éxito',
      text: `Se ha creado la playlist: ${playlistName} con las canciones del álbum.`,
      icon: 'success',
    });

    console.log(playlist);
  };
  // Función para reproducir el álbum
  const handlePlayAlbum = async (album) => {
    const albumId = album.id; // Captura el ID del álbum

    // Función para obtener las pistas del álbum desde la API de Spotify
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
        return albumData.items; // Las pistas están en `items`
      } catch (error) {
        console.error('Error fetching album tracks:', error);
        return []; // Retorna un arreglo vacío en caso de error
      }
    };

    // 1. Obtener las pistas del álbum usando la API de Spotify
    const tracks = await fetchAlbumTracks(albumId);

    // Verifica si se obtuvieron las pistas correctamente
    if (!Array.isArray(tracks) || tracks.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron obtener las pistas del álbum.',
      });
      return;
    }

    // 2. Mapear las pistas del álbum al formato que utiliza tu reproductor (nextQueue)
    const albumTracks = tracks.map(track => ({
      id: track.id,
      name: track.name,
      artists: track.artists, // Mantener como un arreglo de objetos
      album: album.name,
      preview_url: track.preview_url,
      track_number: track.track_number,
      type: track.type,
      uri: track.uri,
    }));

    // 3. Configurar el nextQueue con las pistas del álbum
    setNextQueue(albumTracks); // Aquí se configura `nextQueue` con las pistas obtenidas

    // 4. Solo inicia la reproducción si `currentTrack` está vacío
    if (!currentTrack) {
      const [firstTrack, ...remainingQueue] = albumTracks; // Toma la primera canción
      setCurrentTrack(firstTrack); // Establece la primera pista como la canción actual
      setNextQueue(remainingQueue); // Elimina la primera canción de `nextQueue`
      setIsPlaying(true); // Inicia la reproducción

      // 5. Reproduce la preview de la primera canción
      handlePlaySong(firstTrack); // Asegúrate de que esta función reproduzca la preview de la canción
    }

    console.log("Playing album:", albumTracks);
  };
  // Función para reproducir una playlist desde el localStorage
  const handlePlayPlaylistFromLocalStorage = (playlistName) => {
    // 1. Obtener las playlists desde el localStorage
    const playlists = JSON.parse(localStorage.getItem('playlists'));

    if (!playlists || !Array.isArray(playlists)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se encontraron playlists guardadas en localStorage.',
      });
      return;
    }

    // 2. Buscar la playlist seleccionada por nombre
    const selectedPlaylist = playlists.find(pl => pl.name === playlistName);

    if (!selectedPlaylist || !selectedPlaylist.tracks || selectedPlaylist.tracks.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `No se encontraron pistas en la playlist "${playlistName}".`,
      });
      return;
    }

    // 3. Mapear las pistas de la playlist al formato de `nextQueue`
    const playlistTracks = selectedPlaylist.tracks.map(track => ({
      id: track.id,
      name: track.name,
      artists: track.artists, // Mantener como un arreglo de objetos
      album: track.album,
      preview_url: track.preview_url,
      track_number: track.track_number,
      type: track.type,
      uri: track.uri,
    }));

    // 4. Configurar nextQueue con las pistas de la playlist
    setNextQueue(playlistTracks);

    // 5. Iniciar la reproducción si no hay una canción en curso
    if (!currentTrack) {
      const [firstTrack, ...remainingQueue] = playlistTracks; // Toma la primera canción
      setCurrentTrack(firstTrack); // Asigna la canción actual
      setNextQueue(remainingQueue); // Elimina la primera canción de `nextQueue`
      setIsPlaying(true); // Inicia la reproducción
    }

    console.log("Playing playlist from localStorage:", playlistTracks);
  };



  const handlePlayPreview = () => {
    if (audio) {
      // Si hay un audio en reproducción, deténlo
      audio.pause(); // Detiene la reproducción
    }

    if (currentTrack?.preview_url) {
      const newAudio = new Audio(currentTrack.preview_url);
      newAudio.play(); // Reproduce la vista previa
      setAudio(newAudio); // Guarda el nuevo objeto de audio
      setIsPreviewPlaying(true); // Cambia el estado a en reproducción
      console.log("Reproduciendo vista previa de:", currentTrack.name);

      // Maneja la finalización de la vista previa
      newAudio.addEventListener('ended', () => {
        setIsPreviewPlaying(false); // Cambia el estado a no reproducido al terminar
      });
    } else {
      console.log("No hay vista previa disponible para esta canción.");
    }
  };

  const handlePausePreview = () => {
    if (audio) {
      audio.pause(); // Detiene la reproducción
      setIsPreviewPlaying(false); // Cambia el estado a no reproducido
      console.log("Pausando vista previa de:", currentTrack.name);
    }
  };

  const getPlaylistsFromStorage = () => {
    const storedPlaylists = localStorage.getItem("playlists");
    return storedPlaylists ? JSON.parse(storedPlaylists) : [];
  };

  useEffect(() => {
    if (currentTrack?.duration) {
      setDuration(currentTrack.duration); // Establece la duración de la canción
    }
  }, [currentTrack]);

  const handleSliderChange = (value) => {
    setCurrentTime(value); // Actualiza el tiempo actual cuando el slider cambia
    // Aquí puedes agregar lógica para buscar en el audio y establecer la posición
    if (audio) {
      audio.currentTime = value; // Mueve el audio a la posición seleccionada
    }
  };


  // useEffect para actualizar currentTrack y nextQueue cuando cambie nextQueue
  useEffect(() => {
    if (!currentTrack && nextQueue.length > 0) {
      const [nextTrack, ...remainingQueue] = nextQueue; // Desestructuramos el primer elemento de nextQueue
      setCurrentTrack(nextTrack); // Asignamos la primera canción de nextQueue a currentTrack
      setNextQueue(remainingQueue); // Actualizamos nextQueue eliminando la primera canción
      setIsPlaying(true); // Iniciamos la reproducción
    }
  }, [nextQueue, currentTrack, setCurrentTrack, setIsPlaying]);



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
  // Función para crear una nueva playlist vacía o con canciones
  const handleCreatePlaylist = () => {
    if (playlistName.trim() === "") return; // Evita que se cree una playlist sin nombre

    // Crear una nueva playlist vacía inicialmente
    const newPlaylist = {
      name: playlistName,
      songs: [] // Inicia la playlist vacía
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

  const handlePrevious = () => {
    if (previousQueue.length > 0) {
      const lastTrack = previousQueue[previousQueue.length - 1]; // Obtiene la última canción de previousQueue
      setCurrentTrack(lastTrack); // Asigna la canción actual a lastTrack

      // Solo mueve currentTrack a nextQueue si está definido
      if (currentTrack) {
        setNextQueue([currentTrack, ...nextQueue]); // Mueve currentTrack a la parte de nextQueue

      }


      setPreviousQueue(previousQueue.slice(0, -1)); // Remueve el último elemento de previousQueue
    } else {
      console.log('No hay canciones anteriores en la cola.');
    }
  };

  const handleNext = () => {
    if (nextQueue.length > 0) {
      const nextTrack = nextQueue[0]; // Obtiene la primera canción de nextQueue
      setCurrentTrack(nextTrack); // Asigna la canción actual a nextTrack
      setNextQueue(nextQueue.slice(1)); // Elimina la canción actual de nextQueue

      // Solo agrega currentTrack a previousQueue si está definido
      if (currentTrack) {
        setPreviousQueue([...previousQueue, currentTrack]); // Agrega currentTrack a previousQueue

      }
    } else {
      console.log('No hay canciones en la cola.');
    }
  };



  // Renderiza las playlists como opciones en el select

  const clearLocalStorage = () => {
    localStorage.clear(); // Limpia todo el localStorage
    console.log("El localStorage ha sido limpiado."); // Mensaje de confirmación
    setPlaylists([]); // Limpia el estado de playlists también si es necesario
  };

  // cola historial reproduccin
  // Función para guardar el historial en localStorage
  const saveHistoryToLocalStorage = (updatedHistory) => {
    localStorage.setItem('playbackHistory', JSON.stringify(updatedHistory));
  };
  const handleAddToQueue = (track) => {
    if (isPlaying && currentTrack?.id === track.id) {
      console.log("La canción ya está en reproducción.");
      return;
    }

    if (!isPlaying) {
      setCurrentTrack(track); // Establece la canción actual
      setIsPlaying(true); // Cambia el estado a reproduciendo
      console.log("Reproduciendo la canción:", track);
    } else {
      if (currentTrack) {
        const isTrackInNextQueue = nextQueue.some(item => item.id === track.id);
        if (!isTrackInNextQueue) {
          setNextQueue(prevNextQueue => [...prevNextQueue, track]);
          console.log("Se agrega a nextQueue y queda:", [...nextQueue, track]);
        } else {
          console.log("La canción ya está en nextQueue.");
        }
      }
    }
  };

  // Función para formatear el tiempo en minutos:segundos
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };



  // Función para manejar la acción de reproducción y cola
  const handleSongAction = (track) => {
    handleAddToQueue(track);
  };

  /* Historial */
  useEffect(() => {
    // Función para agregar la canción al historial temporal
    const updateHistory = (track) => {
      if (!track) return; // Si no hay canción en currentTrack, no hacer nada
  
      // Verificar si la canción ya está en el historial para evitar duplicados
      const isAlreadyInHistory = history.some((song) => song.id === track.id);
      
      if (!isAlreadyInHistory) {
        // Verificar si track.artists es un arreglo antes de usar map
        const artists = Array.isArray(track.artists)
          ? track.artists.map(artist => artist.name).join(', ')
          : 'Artista desconocido'; // Valor por defecto en caso de que no haya artistas
      
        // Agregar la canción al historial temporal
        const newHistory = [
          ...history,
          {
            id: track.id,
            name: track.name,
            artists: artists, // Usa la variable que contiene los artistas
            album: track.album,
            preview_url: track.preview_url,
          },
        ];
      
        // Actualizar el estado de historial
        setHistory(newHistory);
      }
      
    };
  
    // Llamar a la función updateHistory cada vez que currentTrack cambie
    if (currentTrack) {
      updateHistory(currentTrack); // Actualizar historial temporal
      console.log("Current track added to history:", currentTrack);
    }
  
  }, [currentTrack]); 


  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <div className="flex flex-1 overflow-hidden  ">

        {/* Left Panel - Playlist */}
        <div className="w-64 p-6 bg-zinc-800 rounded-md ">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Library className="mr-2" />
              <h2 className="text-xl font-semibold">Tu biblioteca</h2>
            </div>
            <div className="flex items-center">

            <Link to="/">
            <Button variant="secondary"><HomeIcon></HomeIcon>Home</Button>
          </Link>
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

          <div className="flex flex-row">
            <Button onClick={() => setIsOpen(true)} className="bg-slate-500 text-black hover:bg-slate-900">
              <Plus size="icon" />
            </Button>
            <Button onClick={handleDeletePlaylist} className="bg-red-500 text-white hover:bg-red-600">
              <Trash2 size="icon" />
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-220px)]">
            <div className="space-y-4">
              {playlists.map((playlist) => (
                <Collapsible key={playlist.id} className="mb-2">
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-zinc-800 rounded-md">
                    <div className="flex items-center" >
                      <Music className="mr-2 h-4 w-4" />
                      <div className="flex items-center" onClick={() => handlePlayPlaylistFromLocalStorage(playlist.name)}>
                        <Play className="mr-2 h-5 w-5 hover:bg-green-900 " />
                        <span>{playlist.name}</span>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {Array.isArray(playlist.tracks) && playlist.tracks.length > 0 ? (
                      playlist.tracks.map((track) => (
                        <div key={track?.id} className="flex items-center justify-between py-2 px-2 hover:bg-zinc-800 rounded-md group">
                          <div>
                            <p className="text-sm font-medium">{track?.name || "Canción Sin Nombre"}</p>
                            <p className="text-xs text-zinc-400">{track?.artist || "Artista Desconocido"}</p>
                          </div>
                          <Button size="icon" variant="ghost" onClick={() => handleSongAction(track)} className="opacity-0 group-hover:opacity-100 transition-opacity">
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
                    <AvatarImage
                      src={artist.images[0]?.url || `/placeholder.svg?height=160&width=160`}
                      alt={artist.name}
                    />
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
                    <AvatarImage
                      src={album.images[0]?.url || `/placeholder.svg?height=160&width=160`}
                      alt={album.name}
                    />
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
                        <DropdownMenuItem onClick={() => handleAddAlbumToPlaylist(album)}>Agregar a Playlist</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePlayAlbum(album)}>Reproducir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Button>
                </div>
              ))}

              <div className="flex flex-col">
                {/* Encabezados de las canciones */}
                <div className={`grid ${searchType === "Canciones" ? 'grid-cols-1 ' : 'hidden'} gap-4 mb-8`}>
                  <div className="flex items-center justify-between w-full">
                    <div className="w-8 text-center">#</div>
                    <div className="flex-1 text-left">Título</div>
                    <div className="w-1/3 text-left">Álbum</div>
                    <div className="w-16 text-right"><Clock size={16} /></div>
                  </div>
                  <Separator className="my-4" />
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
                        <DropdownMenuTrigger>
                          <Play className="h-6 w-6" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleAddToPlaylist(track)}>
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
        <div className="w-96 p-6 bg-zinc-800 rounded-md ">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {currentTrack ? currentTrack.name : "Canción Desconocida"}
            </h2>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-150px)]">
            <img
              src={trackDetails?.album?.images?.[0]?.url || `/placeholder.svg`}
              alt={trackDetails?.album?.name || "Álbum Desconocido"}
            />
            
            <p className="font-medium">
              {currentTrack ? currentTrack.name : "Canción Desconocida"}
            </p>
            <p className="text-sm text-gray-400">
              {currentTrack?.artists?.length > 0
                ? currentTrack.artists.map(artist => artist.name).join(', ')
                : "Artista Desconocido"}
            </p>
            <div className="flex items-center mb-6"></div>

            <h4 className="font-semibold mb-2">Información de la lista</h4>
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-4">
                <div className=' outline outline-offset-2 outline-white-500'>
                  <h3 className="text-lg font-semibold">Anterior</h3>
                  <ul className="mb-4 space-y-2">
                    {previousQueue?.length > 0 ? (
                      previousQueue.map((track) => (
                        <div key={track.id} className="track-item">
                          <p className="text-sm font-medium">{track.name}</p>
                        </div>
                      ))
                    ) : (
                      <p>No hay canciones anteriores.</p>
                    )}
                  </ul>
                </div>

                <div className=' outline outline-offset-2 outline-green-500'>
                  <h3 className="text-lg font-semibold">Reproduciendo Actualmente</h3>
                  {currentTrack ? (
                    <div>
                      <p className="text-sm font-medium">{currentTrack.name}</p>
                      <p className="text-xs text-gray-500">
                        {currentTrack?.artists?.length > 0
                          ? currentTrack.artists.map(artist => artist.name).join(', ')
                          : "Artista Desconocido"}
                      </p>
                    </div>
                  ) : (
                    <p>No hay canciones reproduciéndose.</p>
                  )}
                </div>

                <div className=' outline outline-offset-2 outline-white-500' >
                  <h3 className="text-lg font-semibold">Siguiente Canción</h3>
                  <ul className="mb-4 space-y-2">
                    {nextQueue?.length > 0 ? (
                      nextQueue.map((track) => (
                        <div key={track.id} className="track-item">
                          <p className="text-sm font-medium">{track.name}</p>
                        </div>
                      ))
                    ) : (
                      <p>No hay canciones en la cola.</p>
                    )}
                  </ul>
                </div>
              </div>
            </ScrollArea>

          </ScrollArea>

        </div>


      </div>

      {/* Bottom Panel - Music Player */}
      <div className="h-20 bg-zinc-900 border-t border-zinc-800 p-4 flex items-center justify-between">
        <div className="flex items-center flex-col">
          <div className='flex items-center space-x-3'>
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={trackDetails?.album?.images?.[0]?.url || `/placeholder.svg?height=40&width=40`}
                alt={trackDetails?.album?.name || "Álbum Desconocido"}
              />
            </Avatar>
            
            <div>
              <p className="font-medium">
                {trackDetails?.name || "Canción Desconocida"} {/* Nombre de la canción */}
              </p>
              <p className="text-sm text-gray-400">
                {trackDetails?.artists?.length > 0
                  ? trackDetails.artists.map(artist => artist.name).join(', ')
                  : "Artista Desconocido"} {/* Nombre del artista */}
              </p>


            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-4 mb-2">
            <Button variant="ghost" size="icon" onClick={handlePrevious}>
              <SkipBack className="h-5 w-5" />
            </Button>


            <Button
              size="icon"
              className="rounded-full bg-white text-black h-8 w-8"
              onClick={isPreviewPlaying ? handlePausePreview : handlePlayPreview}
            >
              {isPreviewPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>

            <Button variant="ghost" size="icon" onClick={handleNext}>
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center w-96">
            <span className="text-xs text-gray-400 mr-2">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]} // Valor actual del slider
              onChange={handleSliderChange} // Maneja el cambio del slider
              max={duration} // Duración total de la canción
              step={1} // Paso de un segundo
              className="w-80"
            />
            <span className="text-xs text-gray-400 ml-2">{formatTime(duration)}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <div onClick={showHistory} className="flex items-center cursor-pointer">
              Historial
            </div>
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