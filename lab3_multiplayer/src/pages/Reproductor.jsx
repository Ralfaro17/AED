import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { ChevronRight, Search, Heart, Library, List, Mic2, Play, Plus, Repeat, SkipBack, SkipForward, Volume2, X, Clock } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useForm } from 'react-hook-form';
import { data } from 'autoprefixer'
import { Tabs } from '@radix-ui/react-tabs'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"


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
  const { register, handleSubmit, watch } = useForm();
  const [searchType, setSearchType] = useState("Todo");

  const [isOpen, setIsOpen] = useState(false); // Controla si el diálogo está abierto
  const [playlistName, setPlaylistName] = useState(''); // Guarda el nombre de la playlist
  const [playlists, setPlaylists] = useState([]); // Estado para almacenar las playlists

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
  //play list agregar
  const addToPlaylist = (track) => {
    // Verifica si la playlist ya existe en localStorage
    const existingPlaylists = JSON.parse(localStorage.getItem('playlists')) || {};

    // Agrega la canción a la playlist deseada
    const playlistName = 'Mi Playlist'; // Cambia esto para seleccionar la playlist
    if (!existingPlaylists[playlistName]) {
      existingPlaylists[playlistName] = [];
    }

    existingPlaylists[playlistName].push(track);

    // Guarda las playlists actualizadas en localStorage
    localStorage.setItem('playlists', JSON.stringify(existingPlaylists));
    setPlaylists(existingPlaylists);
  };
  const loadPlaylists = () => {
    const existingPlaylists = JSON.parse(localStorage.getItem('playlists')) || {};
    setPlaylists(existingPlaylists);
  };

  // Llama a loadPlaylists cuando se monta el componente
  useEffect(() => {
    loadPlaylists();
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
    {playlists.map((playlist, index) => (
      <div key={index} className="flex items-center">
        <div>
          <p className="font-medium text-sm">{playlist.name}</p>
          <p className="text-xs text-gray-400">{'Playlist'}</p>
        </div>
      </div>
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

              {searchResults.artists.map((artist, index) => (
                <div key={artist.id} className="bg-zinc-800 p-4 rounded-lg relative group">
                  <Avatar className="h-40 w-40 mb-4">
                    <AvatarImage src={artist.images[0]?.url || `/placeholder.svg?height=160&width=160`} alt={artist.name} />
                    <AvatarFallback>{artist.name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-sm">{artist.name}</h3>
                  <p className="text-xs text-gray-400">Artista</p>
                  <Button size="icon" className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-green-500 text-black rounded-full">
                    <Play className="h-6 w-6" />
                  </Button>
                </div>
              ))}

              {/* Mapeo de álbumes */}
              {searchResults.albums.map((album, index) => (
                <div key={album.id} className="bg-zinc-800 p-4 rounded-lg relative group">
                  <Avatar className="h-40 w-40 mb-4">
                    <AvatarImage src={album.images[0]?.url || `/placeholder.svg?height=160&width=160`} alt={album.name} />
                    <AvatarFallback>{album.name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-sm">{album.name}</h3>
                  <p className="text-xs text-gray-400">{album.artists[0]?.name || "Artista Desconocido"}</p>
                  <Button size="icon" className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-green-500 text-black rounded-full">
                    <Play className="h-6 w-6" />
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

                {/* Mapeo de canciones */}
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
                    <Button size="icon" className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity bg-green-500 text-black rounded-full">
                      <Play className="h-6 w-6" />
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
            <h2 className="text-xl font-semibold">Como Tú (Magic Music Box)</h2>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <img src="/placeholder.svg?height=360&width=360" alt="Album Cover" className="w-full h-auto mb-4 rounded-md" />
          <h3 className="text-2xl font-bold mb-1">Como Tú (Magic Music Box)</h3>
          <p className="text-gray-400 mb-4">León Larregui</p>
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="icon" className="text-green-500">
              <Heart className="h-8 w-8" />
            </Button>
          </div>
          <h4 className="font-semibold mb-2">Información sobre el artista</h4>
          <img src="/placeholder.svg?height=240&width=360" alt="Artist Info" className="w-full h-auto rounded-md" />
        </div>
      </div>

      {/* Bottom Panel - Music Player */}
      <div className="h-20 bg-zinc-900 border-t border-zinc-800 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-14 w-14 mr-4">
            <AvatarImage src="/placeholder.svg?height=56&width=56" alt="Now Playing" />
            <AvatarFallback>NP</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">Como Tú (Magic Music Box)</p>
            <p className="text-sm text-gray-400">León Larregui</p>
          </div>
          <Button variant="ghost" size="icon" className="ml-4">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-4 mb-2">
            <Button variant="ghost" size="icon">
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button size="icon" className="rounded-full bg-white text-black h-8 w-8">
              <Play className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center w-96">
            <span className="text-xs text-gray-400 mr-2">0:07</span>
            <Slider defaultValue={[2]} max={100} step={1} className="w-80" />
            <span className="text-xs text-gray-400 ml-2">3:52</span>
          </div>
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