import React, { useEffect, useState, } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CFormLabel, CButton,CForm, CFeedback, CFormInput, CFeedbackRow, CInputGroup, CRow, CFeedbackHeaderCell, CProgressBar, CImage, CFeedbackDataCell, CFeedbackHead, CFeedbackBody } from '@coreui/react'
import { useForm } from 'react-hook-form';
import { getDatabase, ref, remove, set } from 'firebase/database';
import { initializeApp } from "firebase/app";
import {
    cilChevronLeft,
    cilChevronRight,
    cilSearch,
    cilPenNib,
    cilTrash,
    cilPlus
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { Link, useNavigate } from 'react-router-dom';
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
const getCurrentDate = function () {
    let now = new Date();
    let year = now.getFullYear();
    let month = String(now.getMonth() + 1).padStart(2, '0');
    let day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Feedbacks = () => {
    const { register, watch, setValue, handleSubmit } = useForm({
        defaultValues: {
            dateStart: getCurrentDate(),
            dateEnd: getCurrentDate(),
            revenue: 0
        },
    });


    const getRevenue = async (value) => {
        const dateStart = encodeURIComponent(watch('dateStart')); // encodeURIComponent để xử lý các ký tự đặc biệt trong tham số truy vấn
        const dateEnd = encodeURIComponent(watch('dateEnd'));
        await fetch(`http://localhost:8000/revenue?dateStart=${dateStart}&dateEnd=${dateEnd}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            return response.json();
        }).then(data => {
            setValue('revenue', data.revenue)
        }).catch(e => {
            console.log(e.message)
        })
    };



   
    const onSubmit = (data) => {
        getRevenue();
    };

    return <>
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Doanh Thu</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm onSubmit={handleSubmit(onSubmit)}>
                            <CCol xs={12} sm={6} className='mt-3'>
                                <CFormLabel>Từ Ngày</CFormLabel>
                                <CFormInput
                                    {...register("dateStart")}
                                    type='date'
                                    defaultValue={getCurrentDate()}
                                    feedbackInvalid="Vui lòng chọn ngày." />
                            </CCol>
                            <CCol xs={12} sm={6} className='mt-3'>
                                <CFormLabel>Đến Ngày</CFormLabel>
                                <CFormInput
                                    {...register("dateEnd")}
                                    type='date'
                                    defaultValue={getCurrentDate()}
                                    feedbackInvalid="Vui lòng chọn ngày." />
                            </CCol>
                            <CCol xs={12} sm={6} className='mt-3' >
                                <CButton className='mt-1 text-light' type='submit' style={{ width: 120 }} color="success">Doanh Thu</CButton>
                            </CCol>
                            <CCol xs={12} sm={6} className='mt-3'>
                                <CFormLabel>Tổng Doanh Thu</CFormLabel>
                                <CFormInput
                                    {...register("revenue")}
                                    type='text'
                                    value={watch('revenue')}
                                    defaultValue={0}
                                    readOnly={true}
                                />
                            </CCol>
                        </CForm>

                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </>;
}

export default Feedbacks;
