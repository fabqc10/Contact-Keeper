import React,{ useReducer} from "react";
import axios from 'axios';
import ContactContext from "./contactContext";
import ContactReducer from "./contactReducer";
import {
    GET_CONTACTS,
    ADD_CONTACT,
    CONTACT_ERROR,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
} from '../types';

const ContactState = props =>{
    const initialState = {
         contacts : null,
         current:null,
         filtered:null,
         error:null
    }

    const [state, dispatch] = useReducer(ContactReducer, initialState);
    
    //Get Contatcs
    const getContacts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/contacts');
            dispatch({
                type:GET_CONTACTS,
                payload:res.data
            })
        } catch (err) {
            dispatch({
                type:CONTACT_ERROR,
                payload:err.response.msg
            })
        }
    }

    //Add contact
    const addContact = async contact =>{

        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        try {
            const res = await axios.post('http://localhost:5000/api/contacts',contact,config);
            dispatch({
                type:ADD_CONTACT,
                payload:res.data
            })
        } catch (err) {
            dispatch({
                type:CONTACT_ERROR,
                payload:err.response.msg
            })
        }
        
        
    }

    //Delete Contact
    const deleteContact = async id =>{
       await axios.delete(`http://localhost:5000/api/contacts/${id}`)

        try {
            dispatch({
                type:DELETE_CONTACT,
                payload:id
            })
        } catch (err) {
            dispatch({
                type:DELETE_CONTACT,
                payload:err.response.msg
            })
        }
    }
    //Update Contact
    const updateContact = async contact =>{
        const config = {
            headers:{
                "Content-Type" : "application/json"
            }
        }

        try {
            const res = await axios.put(`http://localhost:5000/api/contacts/${contact._id}`,contact,config);

            dispatch({
                type:UPDATE_CONTACT,
                payload:res.data
            })

        } catch (err) {
            dispatch({
                type:CONTACT_ERROR,
                payload:err.response.msg
            })
        }
    }
    //Clear contacts
    const clearContacts = () =>{
        dispatch({
            type:CLEAR_CONTACTS
        })
    }
    //Set current contact
    const setCurrent = contact =>{
        dispatch({type:SET_CURRENT , payload:contact})
    }

    //Clear Current Contact
    const clearCurrent = ()=>{
        dispatch({type:CLEAR_CURRENT})
    }

    //Filter Contacts
    const filterContacts = text =>{
        dispatch({type:FILTER_CONTACTS, payload:text})
    }
    //Clear Filter
    const clearFilter = ()=>{
        dispatch({type:CLEAR_FILTER})
    }

    return(
        <ContactContext.Provider
        value={{
            contacts: state.contacts,
            current:state.current,
            filtered:state.filtered,
            error:state.error,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            getContacts,
            clearContacts
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;

