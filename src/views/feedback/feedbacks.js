import React, { useEffect, useState, } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CFeedback, CFeedbackRow, CInputGroup, CRow, CFeedbackHeaderCell, CProgressBar, CImage, CFeedbackDataCell, CFeedbackHead, CFeedbackBody } from '@coreui/react'
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Feedbacks = () => {
    const navigate = useNavigate();
    const pageSizes = [
        5,
        10,
        20,
        50,
    ];

    const [page, setPage] = useState(0);
    const [feedbacks, setFeedbacks] = useState([]);
    const [feedbackPerPage, setFeedbackPerPage] = useState(pageSizes[0]);
    const [totalFeedback, setTotalFeedback] = useState(0);
    const [load, setLoad] = useState([]);
    const { register, watch, } = useForm({
        defaultValues: {
            search: '',
            pageSize: 10
        },
    });

    useEffect(() => {
        getFeedbacks();
    }, []);


    const getFeedbacks = async (value) => {
        const searchValue = encodeURIComponent(watch('search')); // encodeURIComponent để xử lý các ký tự đặc biệt trong tham số truy vấn
        const pageSizeValue = encodeURIComponent(watch('pageSize'));
        await fetch(`http://localhost:8000/feedbacks?name=${searchValue}&limit=${pageSizeValue}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            return response.json();
        }).then(data => {
            setFeedbacks(data)
            setTotalFeedback(data.length);
        }).catch(e => {
            console.log(e.message)
        })
    };

    const deleteFeedback = async (id) => {
        if (window.confirm('Bạn có muốn xóa không?')) {
            const databaseRef = ref(getDatabase(), `feedbacks/${id}`); // Thay '/path/to/data' bằng đường dẫn bạn muốn xóa
            // Sử dụng remove để xóa dữ liệu
            remove(databaseRef)
                .then(() => {
                    console.log('Data removed successfully.');
                    getFeedbacks();
                })
                .catch((error) => {
                    console.error('Error removing data:', error);
                });
        }
    }

    const totalPage = Math.ceil(totalFeedback / feedbackPerPage);
    const lastFeedbackIndex = (page + 1) * feedbackPerPage;
    const firstFeedbackindex = lastFeedbackIndex - feedbackPerPage;
    const currentFeedbacks = feedbacks.slice(firstFeedbackindex, lastFeedbackIndex);

    const onClickNext = (next) => setPage(page + next > totalPage ? page : page + next);
    const onClickPrev = (next) => setPage(page - next < 0 ? 0 : page - next);
    const onChangeSearch = () => (getFeedbacks());
    const onClickDelete = (uid) => (deleteFeedback(uid));
    const handleChange = event => {
        console.log(event.target.value);
        setFeedbackPerPage(event.target.value);
    };

    return <>
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Quản lý bàn</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CRow className="">
                            {/* <CCol xs={12} sm={6}>
                                <CRow>
                                    <CCol xs={12} sm="7">
                                        <input className="form-control" type="text" placeholder="Nhập để tìm kiếm..." onKeyUp={onChangeSearch} {...register("search")} />
                                    </CCol>
                                    <CCol xs={12} sm="auto">
                                        <select className="form-select" onChange={handleChange} {...register("pageSize")}>
                                            <option value={10}>10 bản ghi</option>
                                            <option value={100}>100 bản ghi</option>
                                            <option value={1_000}>1.000 bản ghi</option>
                                            <option value={10_000}>10.000 bản ghi</option>
                                            <option value={100_000_000}>Tất cả bản ghi</option>
                                        </select>
                                    </CCol>
                                </CRow>
                            </CCol> */}
                            {/* <CCol xs={12} sm={6} className="text-end">
                                <button type="button" className="btn" onClick={getFeedbacks}><CIcon icon={cilSearch} size="xl" /></button>
                                <button type="button" className="btn" onClick={() => { navigate(`/feedback/add`) }}><CIcon icon={cilPlus} size="xl" /></button>
                            </CCol> */}
                        </CRow>                        <div className="row table-responsive">
                            <table className="table table-striped ">
                                <thead>
                                    <tr>
                                        <th style={{textAlign: 'center'}}>Id </th>
                                        <th style={{textAlign: 'center'}}>Nội dung</th>
                                        <th style={{textAlign: 'center'}}>Ngày</th>
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentFeedbacks?.map((feedback, i) => (
                                        <tr key={i}>
                                            <td style={{textAlign: 'center'}}>{feedback.id}</td>
                                            <td style={{textAlign: 'center'}}>{feedback.content}</td>
                                            <td style={{textAlign: 'center'}}>{feedback.date}</td>
                                            <td>
                                                <div className="btn-group">
                                                    <button type="button" onClick={() => { deleteFeedback(feedback.id) }} className="btn">
                                                        <CIcon icon={cilTrash} size="sm" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-end">
                                    <li className="page-item"><a className="page-link" onClick={() => onClickPrev(1)}> <CIcon icon={cilChevronLeft} size="sm" /></a></li>
                                    <li className="page-item active"><a className="page-link" onClick={() => onClickNext(0)} >{page == totalPage ? totalPage : page + 1}</a></li>
                                    {
                                        page + 2 <= totalPage &&
                                        <li className="page-item">
                                            <a className="page-link" onClick={() => onClickNext(1)} >{page + 2}</a>
                                        </li>
                                    }
                                    {
                                        page + 3 <= totalPage &&
                                        <li className="page-item">
                                            <a className="page-link" onClick={() => onClickNext(2)}>{totalPage - page < 3 ? page + (totalPage - page) : page + 3}</a>
                                        </li>
                                    }
                                    {
                                        page < totalPage - 1 &&
                                        <li className="page-item"><a className="page-link" onClick={() => onClickNext(1)}><CIcon icon={cilChevronRight} size="sm" /></a></li>
                                    }
                                </ul>
                            </nav>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </>;
}

export default Feedbacks;
