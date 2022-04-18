import React, {useEffect, useState} from "react";
import { API, Storage } from "aws-amplify";
import { createTodo as createquery, deleteTodo as deletequery } from '../../graphql/mutations'
import { KmsKeyringBrowser, buildClient, CommitmentPolicy,getClient,KMS } from "@aws-crypto/client-browser";
import {useNavigate} from 'react-router-dom'
import { toBase64 } from '@aws-sdk/util-base64-browser'
import './Image.css'



function Image(){

    const { encrypt, decrypt } = buildClient(
        CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT
      )


    //    const credentials = {
    //     "accessKeyId": "AKIAT6AKAA7HUNBSNIH2" ,
    //     "secretAccessKey": "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"
    //   }

    const [img,setImg] = useState('')
    const [formData, setFormData] = useState({
        name:'',
        description:'',
        image:''
    })
    const navigate = useNavigate();

    const generatorKeyId = 'arn:aws:kms:us-east-1:270603913167:key/25b1d2f2-6e25-4a9d-9f3e-0632a385ba52'

    const keyIds = ['arn:aws:kms:us-east-1:270603913167:key/bca1d330-a935-4b21-b5d6-a5bc05aa8593']

  

    const context = {
        stage: 'demo',
        purpose: 'simple demonstration app',
        origin: 'us-west-2'
      }


      const clientProvider = getClient(KMS, {
        credentials: {
          accessKeyId :  "AKIAT6AKAA7HUNBSNIH2" ,
          secretAccessKey : "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"
        },
      })

      const keyring = new KmsKeyringBrowser({clientProvider,generatorKeyId,keyIds})


    const encryptData = async (data) => {
        // console.log(buildEncrypt)
        // const result = await buildEncrypt({encrypt: (keyring,data, { encryptionContext: context })} )
        console.log(data)
        const {result} = await encrypt(keyring,data, { encryptionContext: context })
        console.log(result);
        const resultBase64 = toBase64(result)
        console.log(resultBase64)
        const { plaintext, messageHeader } = await decrypt(keyring, result)
        console.log("plaintext:",plaintext)
        console.log("messageHeader:",messageHeader)
    }

      useEffect(()=>{
        // console.log(formData)
        async function add(){
        if (!formData.name || !formData.description) return;
        var query = { query: createquery, variables: { input: formData } }
        // console.log(query)
        const res = await API.graphql(query);
        // console.log(res)
        setFormData({
            name:'',
            description:'',
            image:''
        });
        navigate('/home')}
        add();
        
      },[formData])


      
      function getContentType(txt){
        const text = txt.toLowerCase()
        const arr = text?.split('.');
        // console.log(arr[0])
          const type = arr[1]
          // return type;
          return getTypesrc(type)
    }


    function getTypesrc(type){
      //   console.log('running')
        switch(type){
            case 'txt':
                  return 'text/plain'
              case 'png':
                  return 'image/png'
              case 'jpg':
                  return 'image/jpeg'
              case 'svg':
                  return 'image/svg+xml'
              case 'doc':
                  return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
              case 'mp4':
                  return 'video/mp4'
              case 'mp3':
                  return 'audio/mp3'
              case 'docx':
                  return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
              case 'pptx':
                  return 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
              case 'pdf':
                  return 'application/pdf'
        }
    }

    async function insert() {
        if (!img.target.files[0]) return
        // console.log(img.target.files[0])
        const file = img.target.files[0];
        // console.log(file.name)
        const contentType = getContentType(file.name)
        // console.log(contentType)
        setFormData({...formData,name:file.name,description:file.lastModifiedDate,image:file.name });
        // console.log(file)
        // encryptData(file)
        await Storage.put(file.name, file,{contentType:contentType});
        // console.log(formData)
      }

      function back(){
        navigate('/home')
    }

      

      return (
          <div className="image__container">
        <input className="image__input"
        type="file"
        onChange={(e)=>setImg(e)}
   />
   <button className="image__button" onClick={insert}>Insert</button>
   <button className="item__button" onClick={back}>Back</button>
   </div>
      )
}


export default Image;