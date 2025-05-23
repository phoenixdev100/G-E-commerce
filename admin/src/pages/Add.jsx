import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import {backendUrl} from "../App"
import { toast } from 'react-toastify';
 
const Add = ({token}) => {

    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("All Categories");
    const [subCategory, setSubCategory] = useState("Action");
    const[bestseller, setBestseller] = useState(false);
    const [platform, setPlatform] = useState([]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description)
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);
            formData.append("platform", JSON.stringify(platform));

            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);

            const response = await axios.post(backendUrl + "/api/product/add", formData, {headers: {token}});
            console.log(response.data);

            if(response.data.success){
                toast.success(response.data.message)
                setName('')
                setDescription('')
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
                setPrice('')
            }else{
                toast.error(response.data.message)
            }
            

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
        <div>
            <p className='mb-2'>Upload Image</p>

            <div className='flex gap-2'>

                <label htmlFor="image1">
                    <img className='w-20' src={!image1 ?  assets.upload_area : URL.createObjectURL(image1)} alt="" />
                    <input onChange={(e)=>setImage1(e.target.files[0])} type="file" hidden id="image1" />
                </label>

                <label htmlFor="image2">
                    <img className='w-20' src={!image2 ?  assets.upload_area : URL.createObjectURL(image2)} alt="" />
                    <input onChange={(e)=>setImage2(e.target.files[0])} type="file" hidden id="image2" />
                </label>
                
                <label htmlFor="image3">
                    <img className='w-20' src={!image3 ?  assets.upload_area : URL.createObjectURL(image3)} alt="" />
                    <input onChange={(e)=>setImage3(e.target.files[0])} type="file" hidden id="image3" />
                </label>

                <label htmlFor="image4">
                    <img className='w-20' src={!image4 ?  assets.upload_area : URL.createObjectURL(image4)} alt="" />
                    <input onChange={(e)=>setImage4(e.target.files[0])} type="file" hidden id="image4" />
                </label>

            </div>
        </div>

        <div className='w-full'>
            <p className='mb-2'>Game Name</p>
            <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required/>
        </div>

        <div className='w-full'>
            <p className='mb-2'>Game Description</p>
            <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write Content here' required/>
        </div>

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

            <div>
                <p className='mb-2'>Game category</p>
                <select onChange={(e)=>setCategory(e.target.value)} className='w-full px-3 py-2'>
                    <option value="All Categories">All Categories</option>
                    
                </select>
            </div>

            <div>
                <p className='mb-2'>Sub Category</p>
                <select onChange={(e)=>setSubCategory(e.target.value)} className='w-full px-3 py-2'>
                    <option value="Action">Action</option>
                    <option value="Adventure">Adventure</option>
                    <option value="FPS">FPS</option>
                    <option value="MMORPG">MMORPG</option>
                    <option value="Management">Management</option>
                    <option value="Racing">Racing</option>
                    <option value="Role Playing">Role Playing</option>
                    <option value="Simulation">Simulation</option>
                    <option value="Sport">Sport</option>
                    <option value="Strategy">Strategy</option>
                </select>
            </div>

            <div>
                <p className='mb-2'>Game Price</p>
                <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
            </div>

        </div>

        <div>
            <p className='mb-2'>Game platform</p>
            <div className='flex gap-3'>

                <div onClick={()=>setPlatform(prev => prev.includes("PC") ? prev.filter(item => item !== "PC") : [...prev, "PC"])}>
                    <p className={`${platform.includes("PC") ? "bg-[#00c9a7]" : "bg-slate-100"} px-3 py-1 cursor-pointer`}>PC</p>
                </div>

                <div onClick={()=>setPlatform(prev => prev.includes("XBOX") ? prev.filter(item => item !== "XBOX") : [...prev, "XBOX"])}>
                    <p className={`${platform.includes("XBOX") ? "bg-[#00c9a7]" : "bg-slate-100"} px-3 py-1 cursor-pointer`}>XBOX</p>
                </div>

                <div onClick={()=>setPlatform(prev => prev.includes("PS") ? prev.filter(item => item !== "PS") : [...prev, "PS"])}>
                    <p className={`${platform.includes("PS") ? "bg-[#00c9a7]" : "bg-slate-100"} px-3 py-1 cursor-pointer`}>PS</p>
                </div>

            </div>
        </div>   

        <div className='flex gap-2 mt-2'>
            <input onChange={()=>setBestseller(prev => !prev)} checked={bestseller} type="checkbox"  id="bestseller" />
            <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
        </div>  

        <button type='submit' className='w-28 py-3 mt-4 bg-[#00c9a7] text-black font-bold border border-black rounded-md '>ADD</button>   

    </form>
  )
}

export default Add
