import React, { useEffect, useState, useCallback } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCnRQHMhPaH0xfhA_pkXplR7ebQjy7q6j8",
    authDomain: "duan-90921.firebaseapp.com",
    databaseURL: "https://duan-90921-default-rtdb.firebaseio.com",
    projectId: "duan-90921",
    storageBucket: "duan-90921.appspot.com",
    messagingSenderId: "48897335922",
    appId: "1:48897335922:web:0b9454f73a8389e54d58eb",
    measurementId: "G-348JCBXY10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

import {
    CForm,
    CFormInput,
    CFormLabel,
    CFormCheck,
    CCardHeader,
    CButton,
    CInputGroup,
    CInputGroupText,
    CCard,
    CCardBody,
    CFormFeedback
} from '@coreui/react'
import { useForm } from 'react-hook-form';

const UpdateDish = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { register, watch, reset, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
        defaultValues: {
            number: state.number,
            seat: state.seat
        },
    });

    const saveDish = async () => {
        try {
            await fetch(`http://localhost:8000/tables/${state.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tableKey: state.id,
                    number: Number(watch('number')),
                    seat: Number(watch('seat')),
                }),
            }).then(response => {
                navigate('/table');
            }).catch(e => {
                console.log(e.message)
            })
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    const onSubmit = (data) => {
        saveDish();
    };

    return <>
        <CCard>
            <CCardHeader>
                <strong>Cập nhật</strong>
            </CCardHeader>
            <CCardBody>
                <CForm onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Số bàn</CFormLabel>
                        <CFormInput {...register('number', { required: "Vui lòng nhập số bàn" })} type="text" placeholder="VD: 2" />
                        {errors.number && <CFormFeedback className='mt-1' style={{ color: 'red' }}>{errors.number.message}</CFormFeedback>}
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Số chỗ ngồi</CFormLabel>
                        <CFormInput {...register('seat', { required: "Vui lòng số chỗ ngồi" })} type="text" placeholder="VD: 4" />
                        {errors.seat && <CFormFeedback className='mt-1' style={{ color: 'red' }}>{errors.seat.message}</CFormFeedback>}
                    </div>
                    <div className='mb-2 mt-4' style={{ textAlign: 'right' }}>
                        <CButton className='mt-1 text-light' type='submit' color="success" style={{ width: 100 }}>Save</CButton>
                    </div>
                </CForm>
            </CCardBody>
        </CCard >
    </>
}
export default UpdateDish;