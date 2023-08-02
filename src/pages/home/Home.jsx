import { Box, Button, Rating } from '@mui/material';
import imageRef from '../../assets/images/000020_1.jpg';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { hover } from '@testing-library/user-event/dist/hover';
import axios from 'axios';
import { Fragment, useEffect, useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import Skeleton from '@mui/material/Skeleton';

function Home() {
    const [img, setImg] = useState();
    const [img1, setImg1] = useState();
    const [res, setRes] = useState();
    const fileInputRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImg1(file);
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setImage(null);
        setImageUrl(null);
    };

    useEffect(() => {
        const convertToBlob = async () => {
            try {
                const response = await fetch(imageRef);
                const fileContent = await response.blob();
                const file = new File([fileContent], 'new_image.jpg', { type: 'image/jpeg' });

                // Sử dụng file như một đối tượng File trong ReactJS
                // Ví dụ: gửi file qua API hoặc xử lý nó trong component
                // console.log(file);
                setImg(file);
            } catch (error) {
                console.error('Đã xảy ra lỗi:', error);
            }
        };
        convertToBlob();
    }, []);
    const handleTryOn = () => {
        console.log(img, img1);
        const formData = new FormData();
        if (img1) {
            setLoading(true);
            formData.append('file', img1);
            formData.append('file1', img);
            axios
                .post('https://13e6-34-67-146-102.ngrok-free.app/predict_img', formData)
                .then((res) => {
                    setLoading(false);
                    setImageUrl(res.data);
                })
                .catch((error) => {
                    setLoading(false);
                    console.error('Lỗi khi lấy ảnh từ API:', error);
                });
        } else {
            window.alert('Bạn chưa tải ảnh lên');
        }
    };

    const handleFileUpload = () => {
        fileInputRef.current.click();
    };

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth={imageUrl || loading ? 'lg' : 'md'}
            >
                <DialogTitle id="alert-dialog-title" textAlign={'center'}>
                    <Box sx={{ color: 'primary.main', fontSize: '34px', fontWeight: '600', margin: '14px 0 24px 0' }}>
                        {'Thử đồ ảo'}
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-description"
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Box display={'flex'} alignItems={'center'} justifyContent={'space-around'}>
                            <Box
                                display={'flex'}
                                flexDirection={'column'}
                                marginRight={'50px'}
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                <img
                                    style={{ width: '240px', height: '240px', marginBottom: '18px' }}
                                    src={imageRef}
                                    alt="#"
                                />
                                <span>Ảnh quần áo</span>
                            </Box>
                            <Box
                                display={'flex'}
                                marginLeft={'50px'}
                                flexDirection={'column'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                {image ? (
                                    <Box
                                        display={'flex'}
                                        flexDirection={'column'}
                                        // marginRight={'100px'}
                                        alignItems={'center'}
                                        justifyContent={'center'}
                                    >
                                        <Box position={'relative'}>
                                            <img
                                                src={image}
                                                style={{ width: '200px', height: '240px', marginBottom: '15px' }}
                                                alt="#"
                                            />
                                            <CloseIcon
                                                onClick={() => {
                                                    setImg1(null);
                                                    setImage(null);
                                                }}
                                                sx={{
                                                    position: 'absolute',
                                                    top: '4px',
                                                    right: '4px',
                                                    color: '#ee4d2d',
                                                    cursor: 'pointer',
                                                }}
                                            />
                                        </Box>
                                        <span>Ảnh tải lên</span>
                                    </Box>
                                ) : (
                                    <Box
                                        width={'200px'}
                                        height={'240px'}
                                        marginBottom={'28px'}
                                        display={'flex'}
                                        alignItems={'center'}
                                        justifyContent={'center'}
                                        flexDirection={'column'}
                                        border={'1px dashed #1976d2'}
                                    >
                                        <CloudUploadIcon
                                            onClick={handleFileUpload}
                                            sx={{
                                                width: '80px',
                                                height: '80px',
                                                color: 'primary.main',
                                                cursor: 'pointer',
                                            }}
                                        />
                                        <span style={{ fontSize: '14px' }}>Tải ảnh lên</span>
                                    </Box>
                                )}
                            </Box>
                            {loading ? (
                                <Box
                                    display={'flex'}
                                    flexDirection={'column'}
                                    // marginLeft={'80px'}
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                    marginBottom={'37px'}
                                >
                                    <Skeleton
                                        variant="rectangular"
                                        // width={'200px'}
                                        // height={'240px'}
                                        width={200}
                                        height={240}
                                        sx={{ marginLeft: '80px' }}
                                    />
                                </Box>
                            ) : imageUrl ? (
                                <Box
                                    display={'flex'}
                                    flexDirection={'column'}
                                    marginLeft={'80px'}
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                >
                                    {/* <img style={{ width: '240px', height: '240px' }} src={`data:image/jpeg;base64,${imageUrl}`} alt="#" /> */}
                                    <img
                                        style={{ width: '200px', height: '240px', marginBottom: '18px' }}
                                        src={imageUrl}
                                        alt="#"
                                    />
                                    <span>Ảnh kết quả</span>
                                </Box>
                            ) : (
                                ''
                            )}
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
                    <Box>
                        <Button sx={{ width: '100px' }} onClick={handleClose} variant="outlined">
                            Thoát
                        </Button>
                        <Button
                            onClick={handleTryOn}
                            sx={{
                                width: '100px',
                                backgroundColor: 'red',
                                marginLeft: '40px',
                                '&:hover': { backgroundColor: '#ee4d2d' },
                            }}
                            variant="contained"
                            autoFocus
                        >
                            Gửi
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
            <Box
                sx={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#ccc',
                    justifyContent: 'center',
                }}
            >
                <Box sx={{ width: '80%', display: 'flex', backgroundColor: 'white', borderRadius: '6px' }}>
                    <Box
                        sx={{
                            width: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            padding: '16px 0',
                        }}
                    >
                        <Box>
                            <img style={{ width: '380px', height: '380px' }} src={imageRef} alt="#" />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box
                                sx={{
                                    padding: '8px',
                                    margin: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    cursor: 'pointer',
                                }}
                            >
                                <img style={{ width: '54px', height: '54px' }} src={imageRef} alt="#" />
                            </Box>
                            <Box
                                sx={{
                                    padding: '8px',
                                    margin: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    cursor: 'pointer',
                                }}
                            >
                                <img style={{ width: '54px', height: '54px' }} src={imageRef} alt="#" />
                            </Box>
                            <Box
                                sx={{
                                    padding: '8px',
                                    margin: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    cursor: 'pointer',
                                }}
                            >
                                <img style={{ width: '54px', height: '54px' }} src={imageRef} alt="#" />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', padding: '16px 0' }}>
                        <Box
                            sx={{
                                height: '60px',
                                display: 'flex',
                                padding: '4px 0',
                                flexDirection: 'column',
                            }}
                        >
                            <Box
                                sx={{
                                    fontSize: '28px',
                                    fontWeight: '600',
                                    marginBottom: '4px',
                                }}
                            >
                                Áo polo
                            </Box>
                            <Rating name="read-only" value={5} readOnly />
                        </Box>
                        <Box
                            sx={{
                                height: '50px',
                                fontSize: '22px',
                                fontWeight: '400',
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#ccc',
                                width: '90%',
                                margin: '20px 0',
                            }}
                        >
                            <span style={{ marginLeft: '8px' }}>200.000 VND</span>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10px', padding: '4px 0' }}>
                            <Box sx={{ fontSize: '20px', fontWeight: '400' }}>Kích thước</Box>
                            <Box>
                                <Button variant="outlined" sx={{ margin: '14px' }}>
                                    S
                                </Button>
                                <Button variant="outlined" sx={{ margin: '14px' }}>
                                    M
                                </Button>
                                <Button variant="outlined" sx={{ margin: '14px' }}>
                                    L
                                </Button>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', padding: '4px 0' }}>
                            <Box sx={{ fontSize: '20px', fontWeight: '400' }}>Màu</Box>
                            <Box>
                                <Button variant="outlined" sx={{ margin: '14px' }}>
                                    Đỏ
                                </Button>
                                <Button variant="outlined" sx={{ margin: '14px' }}>
                                    Xanh
                                </Button>
                                <Button variant="outlined" sx={{ margin: '14px' }}>
                                    Vàng
                                </Button>
                            </Box>
                        </Box>
                        <Box>
                            <Box sx={{ fontSize: '20px', fontWeight: '400' }}>Số lượng</Box>
                            <Box sx={{ margin: '14px' }}>
                                <Button variant="outlined" startIcon={<RemoveIcon />} endIcon={<AddIcon />}>
                                    <span style={{ margin: '0px 8px', fontSize: '16px' }}>1</span>
                                </Button>
                            </Box>
                        </Box>
                        <Box sx={{ padding: '4px 0' }}>
                            <Button sx={{ margin: '10px', width: '100px' }} variant="contained">
                                Mua
                            </Button>
                            <Button
                                onClick={handleClickOpen}
                                sx={{
                                    width: '100px',
                                    backgroundColor: 'red',
                                    marginLeft: '18px',
                                    '&:hover': { backgroundColor: '#ee4d2d' },
                                }}
                                variant="contained"
                            >
                                Thử
                            </Button>
                            <input ref={fileInputRef} onChange={handleImageChange} type="file" hidden />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Fragment>
    );
}

export default Home;
