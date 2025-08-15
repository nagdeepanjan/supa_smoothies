import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"
import SmoothieCard from "../components/SmoothieCard"

export default function Home() {

  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')

  function handleDelete(id){
    setSmoothies(prevSmoothies=>{
      return prevSmoothies.filter(s=>s.id!=id)
    })
  }


  useEffect(()=>{
    const fetchSmoothies = async() =>{
      const {data, error} = await supabase
      .from('smoothies')
      .select()
      .order(orderBy, {ascending: false})

      if(error)
      {
        setFetchError('Could not fetch smoothies')
        setSmoothies(null)
        console.log(error)
      }
      if(data)
      {
        console.log(data)
        setSmoothies(data)
        setFetchError(null)
      }
    }
    fetchSmoothies()
  }, [orderBy])

  return (
  
    <div className="page home">
      <h1>Smoothies</h1>

      {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (
        <div className="smoothies">

          <div className="order-by">
            <p>Order By:</p>
            <button onClick={()=>setOrderBy('created_at')}>Time Created</button>
            <button onClick={()=>setOrderBy('title')}>Title</button>
            <button onClick={()=>setOrderBy('rating')}>Rating</button>
          </div>


          <div className="smoothie-grid">
            {
              smoothies.map(s=>(
                <SmoothieCard key = {s.id} smoothie={s} onDelete={handleDelete}/>
              ))
            }
          </div>
          
        </div>
      )}
    </div>
  )
}