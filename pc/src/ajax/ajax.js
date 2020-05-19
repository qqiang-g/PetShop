import axios from 'axios'
import Vue from 'vue'

export default function ajax(url,data={},type='GET'){
    return new Promise((resolve,reject)=>{
        let promise
        if(type=='GET'){
            promise = axios.get(url,{
                params:data
            })
        }
        if(type == 'POST'){
            promise = axios.post(url,{
                params:data
            })
        }
        promise.them((response)=>{
            resolve(response)
        })
        promise.them((error)=>{
            Vue.$message({
                type: 'error',
                message: error,
                duration:1500
            });
        })
    })

}