import React, { useRef, Component, useEffect, useState } from "react";

import { Await, useLocation, useNavigate } from "react-router-dom";

import styles from '../styles/main.module.css'
// import hum from '../images/comp/Ellipse1.png'
import Popup  from "./popup";

const Main = () =>{
    
    const navigate = useNavigate();
    //forms
    const [notes, setNotes] = useState([1, 2, 3, 4, 5]);
    //Основа
    const [product, setProduct] = useState([]);
    const [prodSxeme, setprodSxeme] = useState([]);
    const [indexProd, setIndexProd] = useState(["1"]);
    const [ind, setInd] = useState(0);
    const [del, setDel] = useState("")
    const [all, setAll] = useState(0);
    
    //Popup
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    //Create new Product
    const handleChange = (index, {target: {value}})=>{
        setNotes([...notes.slice(0, index), value, ...notes.slice(index 
            + 1)]);
        
        console.log(notes)
    }
    
    
    async function AddSelect() {
        try{
            fetch(`https://fakestoreapi.com/products`, {
                method: 'POST',
                body:JSON.stringify({
                    title: notes[0],
                    price: notes[1],
                    description: notes[2],
                    image: notes[3],
                    category: notes[4]
                })
            })
            .then(res=>res.json())
            .then(json=>console.log(json))
            console.log(notes)
            alert('Добавлено!')
        } catch(err){
            console.log(err.message)
            alert('Ошибка Добавления!')
        }
       
    }

    const handleSubmit = (e) =>{
        let mas = product.splice(0, 5)
        console.log(mas)
        if(mas.length>0){
            let arr = prodSxeme
            arr.push(mas)
            setprodSxeme(arr)
            
            let arr2 = indexProd
            arr2.push("1")
            setIndexProd(arr2)
            console.log(prodSxeme)
            let ind2 = ind + 1
            setInd(ind2)
            setAll(0)
        }
        
    }
    
    const handleSubmitDelete = (e) => {  

        console.log(e.target.value)
        let id = e.target.value
        if (window.confirm("Вы точно хотите удалить этот Элемент?")) {
            Delet(id)
            let mySkills = id.split(',', 2)
            prodSxeme[mySkills[1]].splice(mySkills[0], 1)
            setprodSxeme(prodSxeme)
            setDel(mySkills)
            if(mySkills[1] == ind){
                setAll(all+1)
            }
        }
    }
    
    async function Delet(id) {
        let mySkills = id.split(',', 2)
        console.log(mySkills[0])
        let num2 = +mySkills[0]
        let num = mySkills[1] == 0 ? 
        num2 : mySkills[1] == 1 ? 
        num2+5 : mySkills[1] == 2 ? 
        num2+10 : mySkills[1] == 3 ?
        num2+15 : num2
        console.log(num)
        try{
            fetch(`https://fakestoreapi.com/products/${num}`, {
                method: 'DELETE'
            })
            .then(res=>res.json())
            .then(json=>console.log(json))
            alert('Удаление заверешно!')
        } catch(err){
            console.log(err.message)
            alert('Ошибка удаления!')
        }
        
    }

    function addBlock(index){
        let ind2 = index
        return(
            prodSxeme[ind2].map((post, index)=>                                
                <div key = {index} className={ind2}>
                    { 

                        block({post,index,ind2,handleSubmitDelete})
                    
                    }
                </div>
            )
        )   
    }

    function block({post,index,ind2,handleSubmitDelete}){
        let but = index+","+ind2
        let mySkills = but.split(',', 2)
        return(
            <div className={styles.block} id={but}>
                <div className={styles.backBlock}>
                    <button
                        type="button"
                        id={index}
                        value={but}
                        onClick={handleSubmitDelete}
                        className={styles.buttonSub2}
                    >
                        x
                    </button>
                    <img src={post.image} alt="image" />
                </div>
                <div className={styles.bottomBlock}>
                    <h4 className={styles.title}>{post.title}</h4>
                    <p className={styles.dep}>{post.description}</p>
                    <p className={styles.price}>{post.price} $</p>
                </div>
                {  index > 3-all && (mySkills[1] == ind) && 
                <div className="">
                    <button
                    type="button"
                    onClick={handleSubmit}
                    className={styles.buttonAdd}
                >
                    Загрузить еще
                </button>
                </div>               
                } 
            </div>
            
        )  
    }
    const getUsers = async() => {
        try{
            await fetch('https://fakestoreapi.com/products/')
            .then( res=> res.json())
            .then(json => {
                let prod = json
                console.log(product)
                setProduct(prod)
                

                let mas = prod.splice(0, 5)
                let arr2 = prodSxeme
                arr2.push(mas)
                console.log(prodSxeme)
                setprodSxeme(arr2)
                
            })  
        } catch(err){
            console.log(err.message)
        }
        
    }
    useEffect(() => {
        if(del==""){
            getUsers({})
        }
        
        
    }, [del]);
    

    return (
        <div className={styles.wrap}>
        
            <header>
                <div className={styles.container}>
                <div className={styles.sec_inf}>
                    <div className={styles.logo}>
                        <img src="#" alt="Logo" />
                    </div>
                    <div>
                        <nav>
                            <ul>
                                <li><a href="#"
                                >Home</a></li>
                                <li><a  href="#"
                                type="button"
                                onClick={togglePopup}
                                >Add Product</a></li>
                                <li><a href="#"
                                >Filter</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div>
                        <button type="button"
                        onClick={async event => { navigate(`/login`); }}
                        >Login</button>
                    </div>
                </div>
                </div>
            </header>

            <section className={styles.sectMain}>
                <div className={styles.container}>
                    <div>
                        <div className={styles.table}>

                            { indexProd.map((post, index)=>
                                <div key = {index} className={styles.products}>
                                    {prodSxeme.length > 0 ? addBlock(index) 
                                    :  <div>"Загрузка..."{prodSxeme.length}</div>}
                                </div>  
                            )}
                                    
                        </div>
                    </div>
                </div>
            </section>

            <footer className={styles.black_dor}>
                <div className={styles.container}>
                    
                </div>
            </footer>
            {/* Popup */}
            {isOpen && <Popup
                content={<>
                <div className={styles.table2}>
                    <b>Add new Product</b>
                        <label htmlFor="title">Название</label>
                        <input type="text" name="title" id="title" 
                            placeholder="Название" onChange={event => handleChange(0,event)} 
                            autoComplete="off"
                            required
                        />
                        <label htmlFor="price">Цена</label>
                        <input type="number" name="price" id="price" 
                            placeholder="Цена" onChange={event => handleChange(1,event)} 
                            autoComplete="off"
                            required
                        />
                        <label htmlFor="description">Описание</label>
                        <input type="text" name="description" id="description" 
                            placeholder="Описание" onChange={event => handleChange(2,event)} 
                            autoComplete="off"
                            required
                        />
                        <label htmlFor="image">Ссылка</label>
                        <input type="text" name="image" id="image" 
                            placeholder="Ссылка на картинку" onChange={event => handleChange(3,event)} 
                            autoComplete="off"
                            required
                        />
                        <label htmlFor="category">Категория</label>
                        <input type="text" name="category" id="category" 
                            placeholder="Категория" onChange={event => handleChange(4,event)} 
                            autoComplete="off"
                            required
                        />
                    <button
                    type="button"
                    onClick={AddSelect}
                    >Add</button>
                </div>
                </>}
                handleClose={togglePopup}
            />}
        </div>
        
        

        
    )
    }

    

export default Main