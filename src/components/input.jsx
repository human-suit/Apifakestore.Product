import React, { useRef, Component, useEffect, useState } from "react";

import { Await, useLocation, useNavigate } from "react-router-dom";

import styles from '../styles/main.module.css'

// import hum from '../images/comp/Ellipse1.png'


const Login = () =>{
    
    const navigate = useNavigate();
    const { search } = useLocation()

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [users, setUser] = useState({});
    const [nameError, setNameError] = useState("")

    const handleChangeMail = ({target: {value}})=>{
        setName(value)
    }
    const handleChangePassword = ({target: {value}})=>{
        setNumber(value)
    }
    

    async function fetchData() {
        try{
            fetch('https://fakestoreapi.com/users')
            .then(res=>res.json())
            .then(json => {
                let prod = json
                setUser(prod)
                console.log(prod)
            })
            
        } catch(err){
            console.log(err.message)
        }
    }

    const handleSubmit = (e) =>{
        if(name.length < 1 || number.length < 1){
            setNameError("Некоректные данные")
            alert("Заполните обязательные поля! почту или пароль")
            console.log("Заполните обязательные поля! почту или пароль")
        } else {
            setNameError("")
            fetchData()
            vxod()
            
        }
        
    }
    // john@gmail.com
    function vxod(){
        for (let index = 0; index < users.length; index++) {
            const email = users[index].email;
            if(email==name){
                console.log("Привет")
                navigate("/")
                break
            }
            else if(users.length-1==index){
                alert('Пользователь не существует!')
            }
        }
        return 0;
    }
    

    
    
    return (

        <div className="wrap">
            <header>
                <div className={styles.container}>
                <div className={styles.sec_inf}>
                    <div className={styles.logo}>
                        <img src="#" alt="Logo" />
                    </div>
                    <div>
                        <nav>
                            <ul>
                                <li><a 
                                href="/"
                                >Home</a></li>
                                <li><a 
                                href="#"
                                
                                >Add Product</a></li>
                                <li><a 
                                href="#"
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

            <section>
                <div className={styles.container}>
                    <div className={styles.midleContent}>
                        <div className={styles.leftBlock}>
                            
                        </div>
                        <div className={styles.rightBlock}>
                            <div className={styles.content}>
                                <h2>Welcome</h2>
                                <p>please login here</p>
                                <form action="">
                                    <label htmlFor="email">Email Addres</label>
                                    <input type="email" 
                                        name="email" 
                                        id="email"
                                        placeholder="rotate@mail.ru"
                                        value={name}
                                        className={styles.nameVal} 
                                        onChange={handleChangeMail}
                                        autoComplete="off"
                                        required
                                    />
                                    <p className={styles.err}>{nameError}</p>
                                    <label htmlFor="pas">Password</label>
                                    <input type="password" 
                                        name="pas" 
                                        id="pas"
                                        placeholder="*********" 
                                        value={number}
                                        className={styles.namePasword} 
                                        onChange={handleChangePassword}
                                        autoComplete="off"
                                        required
                                    />
                                    <p className={styles.err}>{nameError}</p>
                                    <div className={styles.remFor}>
                                        <div>
                                            <input className={styles.check} 
                                            type="checkbox" 
                                            name="check" 
                                            id="check" 
                                            
                                            />
                                            <label htmlFor="check">Remember me</label>
                                        </div>
                                        <a href="#">Forgot Password</a>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className={styles.buttonSub}
                                    >Login
                                    
                                    </button>                                
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
        
    )
    }
  

export default Login