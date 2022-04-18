import React, {useEffect, useState} from "react";
import { API, button, Storage } from "aws-amplify";
import { listTodos } from '../../graphql/queries'
import { createTodo as createquery, deleteTodo as deletequery } from '../../graphql/mutations'
import Links from "../Links/Links";
import './Home.css'
import addItem from '../../Action/addItem'
import {useNavigate} from 'react-router-dom'
import { useAuthenticator } from "@aws-amplify/ui-react";
import FileImg from '../../../src/files.svg';
import ImageImg from '../../image.svg'
import DocImg from '../../doc.svg';
import VideoImg from '../../video.svg';
import MusicImg from '../../music.svg';
import PDFImg from '../../pdf.svg';
import PPTImg from '../../ppt.svg'
import View from "../View/View";
import addImageUrl from "../../Action/addImageUrl";




function Home(props){

    const [notes,setNotes]= useState([]);
    const navigate = useNavigate()
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const [formData, setFormData] = useState({
        name:'',
        description:''
    })


    function SignOut(e){
        navigate('/signout');
        signOut();   
    }


    useEffect(()=>{
        // console.log(props)
        fetchNotes();
    },[]);

    async function fetchNotes() {
        const apiData = await API.graphql({ query: listTodos });
        const notesFromAPI = apiData.data.listTodos.items;
        await Promise.all(notesFromAPI.map(async note => {
          if (note.image) {
            const image = await Storage.get(note.image);
            note.imageurl = image;
          }
          return note;
        }))
        setNotes(apiData.data.listTodos.items);
    
      }


      async function deleteNote({ id }) {
        const newNotesArray = notes.filter(note => note.id !== id);
        setNotes(newNotesArray);
        await API.graphql({ query: deletequery, variables: { input: { id } }});
      }


      function getTypesrc(type){
        //   console.log('running')
          switch(type){
              case 'txt':
                    return FileImg
                case 'png':
                    return ImageImg
                case 'jpg':
                    return ImageImg
                case 'svg':
                    return ImageImg
                case 'doc':
                    return DocImg
                case 'mp4':
                    return VideoImg
                case 'mp3':
                    return MusicImg
                case 'ocx':
                    return DocImg
                case 'ptx':
                    return PPTImg
                case 'pdf':
                    return PDFImg
          }
      }

      function getFileType(txt){
          const arr = txt?.split('?');
        //   console.log(arr[0])
            const type = (arr[0].substring(arr[0].length-3,arr[0].length)).toLowerCase()
            // return type;
            return getTypesrc(type)
      }


      function view(img){
            const arr = img?.split('.');
        //   console.log(arr[0])
            const type = arr[1].toLowerCase()
            // return type;
            console.log(type)
            if((type === 'png')||(type === 'jpg')||(type === 'svg')||(type === 'mp4')||(type === 'mp3')||(type === 'pdf')){
                console.log('cf')
              const a = document.createElement('a');
              a.href = `https://d32u7y0cmqkkuv.cloudfront.net/public/${img}`
              a.target = ' '
              a.click()
            }
            else{
                console.log('if')
                addImageUrl(img);
                navigate('/view');
            }


    }

        async function download(img){
            const res =await Storage.get(`${img}`,{download:true});

            // const result = await res.Body.text()
            // console.log(result)

            const url = URL.createObjectURL(res.Body);
  const a = document.createElement('a');
  a.href = url;
  a.download = img || 'download';
  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.removeEventListener('click', clickHandler);
    }, 150);
  };
  a.addEventListener('click', clickHandler, false);
  a.click();
  return a;
           
        }




    return (
        <div className="home__section">
            <h1 className="header">Personal Storage Vault</h1>
        <div className="home__container">
            <div className="home__links">
           <Links />
           </div>


        <div>
        <div className="home__items">
            {/* {console.log(notes)} */}
        {   
            notes.map(note => (
                
            <div  key={note.id || note.name}>
            <div  className={!note.image &&"home__item card"} >
                <h2 className="card-title text-center" >{!note.image &&note.name}</h2>
                <p className="card-text .height_90 overflow" >{!note.image&&note.description}</p>
                {!note.image&&<button className="delete__button" onClick={() => deleteNote(note)}>Delete</button>}
            </div>
            <div  className={note.image &&"home__item card"} >
            <h2 className="card-title text-center fileheader" >{note.image &&note.name}</h2>
            {note.image && <img className="image"  src={getFileType(note.imageurl)}  />}
            {/* {note.image&&<a className="download__button"  href={`https://d32u7y0cmqkkuv.cloudfront.net/public/${note.image}`}target=" ">View</a>} */}
            {note.image&&<a className="download__button"    onClick={()=>view(note.image)}>View</a>}
            {/* <iframe src={`docs.google.com/gview?url=https://personalstoragevault52315f8d64cf45d2a1c86a9668a34847-staging.s3.amazonaws.com/public/${note.image}&embedded=true`}></iframe> */}
            {/* {note.image&&<a className="download__button" href={`https://personalstoragevault52315f8d64cf45d2a1c86a9668a34847-staging.s3.amazonaws.com/public/${note.image}`} target=" ">Download</a>} */}
            {note.image&&<button className="download__button" onClick={()=>download(note.image)}>Download</button>}
            {note.image&&<button className="delete__button" onClick={() => deleteNote(note)}>Delete</button>}        
            </div>
            </div>
            
        ))
        }
        </div>
        </div>
        </div>
        <button className='signout__button'onClick={(e)=>SignOut(e)}>Signout</button>

        </div>
    )
 
}

export default Home;
