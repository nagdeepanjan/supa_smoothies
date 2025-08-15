import { Link } from "react-router-dom"
import supabase from "../config/supabaseClient"

export default function SmoothieCard({smoothie, onDelete}){
    async function  handleDelete(e){
        const {data, error} = await supabase
            .from('smoothies')
            .delete()
            .eq('id', smoothie.id)
            .select()

        if(error){
            console.log('Error while deleting: ', error)
        }
        if(data){
            console.log('Deleted successfully: ', data)
            onDelete(smoothie.id)
        }
    }
    
    
    
    
    return(
        <div className="smoothie-card">
            <h3>{smoothie.title}</h3>
            <p>{smoothie.method}</p>
            <div className="rating">{smoothie.rating}</div>
            <div className="buttons">
                <Link to={'/' + smoothie.id}>
                    <i className="material-icons">edit</i>
                </Link>
                <i className="material-icons" onClick={handleDelete}>delete</i>
            </div>
        </div>
    )
}