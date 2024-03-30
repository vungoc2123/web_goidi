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

const UpdateUser = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { register, watch, reset, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
        defaultValues: {
            name: state.name,
            phone: state.phone,
            password: state.password,
            role: state.role
        },
    });

    const saveUser = async () => {
        try {
            await fetch(`http://localhost:8000/users/${state.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userKey: state.id,
                    name: watch('name'),
                    phone: watch('phone'),
                    password: watch('password'),
                    role: watch('role'),
                    token: state.token,
                    soLan: state.soLan,
                }),
            }).then(response => {
                navigate('/user');
            }).catch(e => {
                console.log(e.message)
            })
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    const onSubmit = (data) => {
        saveUser();
    };

    return <>
        <CCard>
            <CCardHeader>
                <strong>Cập nhật</strong>
            </CCardHeader>
            <CCardBody>
                <CForm onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Tên</CFormLabel>
                        <CFormInput {...register('name', { required: "Vui lòng nhập tên" })} type="text" placeholder="VD: marry" />
                        {errors.name && <CFormFeedback className='mt-1' style={{ color: 'red' }}>{errors.name.message}</CFormFeedback>}
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Số điện thoại</CFormLabel>
                        <CFormInput {...register('phone', {
                            pattern: {
                                value: /^\d{10}$/,
                                message: "Số điện thoại phải chứa đúng 10 chữ số và phải là số"
                            },
                            required: "Vui lòng nhập số điện thoại"
                        })} type="text" placeholder="VD: 0123456789" />
                        {errors.phone && <CFormFeedback className='mt-1' style={{ color: 'red' }}>{errors.phone.message}</CFormFeedback>}
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Mật khẩu</CFormLabel>
                        <CFormInput {...register('password', { required: "Vui lòng nhập mật khẩu" })} type="text" placeholder="VD: 2468" />
                        {errors.password && <CFormFeedback className='mt-1' style={{ color: 'red' }}>{errors.password.message}</CFormFeedback>}
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Vai trò</CFormLabel>
                        <CFormInput {...register('role', { required: "Vui lòng nhập vai trò" })} type="text" placeholder="VD: admin: 0  client: 1" />
                        {errors.role && <CFormFeedback className='mt-1' style={{ color: 'red' }}>{errors.role.message}</CFormFeedback>}
                    </div>

                    <div className='mb-2 mt-4' style={{ textAlign: 'right' }}>
                        <CButton className='mt-1 text-light' type='submit' color="success" style={{ width: 100 }}>Save</CButton>
                    </div>
                </CForm>
            </CCardBody>
        </CCard >
    </>
}
export default UpdateUser;