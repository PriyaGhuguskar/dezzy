import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import './page.css'

const PokemonData = () => {
    const [pokemonName, setPokemonName] = useState('')
    const [fetchData, setFetchData] = useState([])
    // const [loading, setLoading] = useState(false)
    const debouncing = useRef(null)

    const FetchURL = async (pokemonName) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            if (pokemonName) {
                setFetchData(response.data)
            }


            console.log(fetchData)
        } catch (err) {
            // setPokemonName('')
            console.log(err)
        }
    }

    useEffect(() => {
        FetchURL(pokemonName)
        // eslint-disable-next-line 
    }, [pokemonName])

    const handleSearch = (name) => {
        setPokemonName(name)
        if (debouncing.current !== null) {
            clearTimeout(debouncing.current);
        }
        debouncing.current = setTimeout(() => {
            FetchURL(name)
        }, 500);
    }

    return (
        <div style={{ padding: '30px' }}>
            <input
                type='text'
                value={pokemonName}
                onChange={(e) => { handleSearch(e.target.value) }}
            />
            <div className='cardWrapper'>
                {pokemonName &&
                    <div
                        style={{
                            border: '1px solid grey', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                            , gap: '15px', width: '150px', height: '150px', margin: '10px auto', fontWeight: 'bold'
                        }}
                    >
                        <div>{pokemonName}</div>
                        <div>
                            Stats: {fetchData?.stats?.map((item) => item?.base_stat).join(',')}

                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default PokemonData

// mohammedharis@dezyit.com
// prasad@dezyit.com
// divyansh@dezyit.com
// aru@dezyit.com