import { useState, useEffect } from "react"
import axios from "axios"
import { jwtDecode } from "jwt-decode";

const Dishes = (props) => {
    const user = jwtDecode(localStorage.getItem("token")).id
    const [color, setColor] = useState("text-dark")
    const [likes, setLikes] = useState(0)
    const [loading, setLoading] = useState(true);

    const handleLike = async () => {
        if (color === "text-dark"){
            setColor("text-success")
        } else {
            setColor("text-dark")
        }
        try {
            await axios.post(`http://localhost:8080/dishes/${props.id}`, {likes: user}, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`
                }
              })
            .then((res) => {
                setLikes(res.data.data.dish.likes.length)
                if([res.data.data.dish.likes].includes(user)){
                    setColor("text-success")
                }

            })            
        } catch (error) {
            console.error(error)
        }
      }

    useEffect(() => {
        const handleLoad = async ()=> {
            try {
                await axios.get(`http://localhost:8080/dishes/${props.id}`, {
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then((res) => {
                    setLikes(res.data.data.dish.likes.length)
                    if(res.data.data.dish.likes.includes(user)){
                        setColor("text-success")
                        setLoading(false)
                    }

                })            
            } catch (error) {
                console.error(error)
                setLoading(false)
            }
        }

        if (loading){
            handleLoad();
        }
    }, [loading, props.id, user])

    return(
        <div className="col-lg-4 col-md-6 mb-4" key={props._id}>
            <div className="card h-100">
                <img className="card-img-top" src={props.image} alt={props.name} />
                <div className="card-body">
                    <h4 className="card-title">{props.name}</h4>
                    <p className="card-text">{props.description}</p>
                </div>
                <div className="card-footer">
                    <small className="text-muted">Price: ${props.price}</small>
                    <div className="right float-end">
                        <div>{likes}</div>
                        <div className={`display-6  ${color}`} onClick={handleLike} >♥</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dishes