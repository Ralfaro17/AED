import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { ChevronRight, Heart, Library, List, Mic2, Play, Plus, Repeat, Search, SkipBack, SkipForward, Volume2, X } from 'lucide-react'
import { useForm } from 'react-hook-form';
import { data } from 'autoprefixer'


///para evitarme la fatiga
const CLIENT_ID ='888d5afa7d92449eb48b97c8973359aa';
const CLIENT_SECRET ='2eccf73ca43f41d4b7900b42de267e63';

function MusicStreamingApp() {

    const { register, handleSubmit, watch } = useForm();
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    


const busquedaDis = watch("search");// se obtiene el valor actual del input

const onSubmit = (data) => {
    console.log("Buscando:", data.search);
    setSearchInput(data.search);
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
        .then(data => setAccessToken(data.access_token));
}, []);

useEffect(() => {
  document.title = "Reproductor de música";
})

//search

async function search(query) {
    console.log("Buscando por: " + query);
    
    // Parámetros de la petición
    var searchParameters = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken  // Agregar espacio después de 'Bearer'
        },
    };

    // Petición a la API de Spotify
    var searchQuery = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist`;
    
    var artistData = await fetch(searchQuery, searchParameters)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Aquí puedes hacer algo con los resultados obtenidos
        })
        .catch(error => {
            console.error("Error en la búsqueda:", error);
        });
}

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
              <Plus className="mr-2" />
              <ChevronRight />
            </div>
          </div>
          <div className="flex mb-0">
            
            
          </div>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input className="pl-10 bg-zinc-800 border-none text-sm" placeholder="Buscar en tu biblioteca" />
          </div>
          <ScrollArea className="h-[calc(100vh-220px)]">
            <div className="space-y-4">
              {['Canciones que te gustan',"come pinga", 'Zara House Music Official',"s","s","s","s", 'office siren', 'BOSSA NOVA CLASSICS', 'Bossa Nova Classics', 'Los 50 más virales: Nicaragua', '00s Rock Anthems'].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div>
                    <p className="font-medium text-sm">{item}</p>
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
          </div>
          <ScrollArea className="h-[calc(100vh-220px)]">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {['Miranda!',"s","s","s","s","s","s","s", 'Blue Flame', 'Amantes de la Irrealidad - Remasterizado'].map((item, index) => (
              <div key={index} className="bg-zinc-800 p-4 rounded-lg relative group">
                <Avatar className="h-40 w-40 mb-4">
                  <AvatarImage src={`/placeholder.svg?height=160&width=160`} alt={item} />
                  <AvatarFallback>{item[0]}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-sm">{item}</h3>
                <p className="text-xs text-gray-400">{index === 0 ? 'Artista' : 'LE SSERAFIM'}</p>
                <Button size="icon" className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-green-500 text-black rounded-full">
                  <Play className="h-6 w-6" />
                </Button>
                <Button size="icon" variant="ghost" className="absolute top-2 right-2">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
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