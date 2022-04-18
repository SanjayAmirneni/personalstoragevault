import React, {useEffect, useState} from "react";
import { API ,Storage} from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { createTodo as createquery, deleteTodo as deletequery } from '../../graphql/mutations'
import './NewTextFile.css'




function NewTextFile(){

    const [notes,setNotes]= useState([]);
    const [formData, setFormData] = useState({
        name:'',
        description:'',
        image:''
    })
    const navigate = useNavigate();


    async function createNote() {
        if (!formData.name || !formData.description) return;
        var query = { query: createquery, variables: { input: formData } }
        // console.log(query)
        await API.graphql(query);
        // setNotes([ ...notes, formData ]);
        await Storage.put(`${formData.name}.txt`, formData.description,{contentType:'text/plain'});
        setFormData({
            name:'',
            description:''
        });
        navigate('/home')
      }

      function back(){
        navigate('/home')
    }


      return (
          <div className="textfile__container">
              <input className="textfile__name"
                onChange={e => setFormData({ ...formData, 'name':e.target.value,'image':`${e.target.value}.txt`})}
                placeholder="Name"
                value={formData.name}
            />
             <textarea className="textfile__text"
                onChange={e => setFormData({ ...formData, 'description': e.target.value})}
                placeholder="Text"
                value={formData.description}
            />
            <button className="textfile__button" onClick={createNote}>Save Text</button>
            <button className="item__button" onClick={back}>Back</button>
          </div>
      )
}

export default NewTextFile;