  
import { 
    MANUFACTURER_RESULTS, 
    LOADING_MANUFACTURER} from './types';
import { axiosLocalhost } from '../../connections/localhost';

const getList = () => {

    return (dispatch:any) => {

        dispatch({
            type: LOADING_MANUFACTURER,
            payload: {message:"", status:true}
        });

        axiosLocalhost().get(`/api/list`)
            .then((res:any) => {

                const {data} = res.data;

                if (res.status === 200 && data.length >= 1) {

                    dispatch({
                        type: MANUFACTURER_RESULTS,
                        payload: data
                    });
                    dispatch({
                        type: LOADING_MANUFACTURER,
                        payload: false
                    });
                }
                else dispatch({
                    type: LOADING_MANUFACTURER,
                    payload: false
                });
            })
            .catch(() => {

                dispatch({
                    type: LOADING_MANUFACTURER,
                    payload: false
                });

            });
    };
};

export const getManufacturer = () => getList();

export const createManufacturer = (body:any) => {

    return (dispatch:any) => {

        dispatch({
            type: LOADING_MANUFACTURER,
            payload: {message:"", status:true}
        });

        axiosLocalhost().post(`/api/create`, body)
            .then((res:any) => {

                console.log({res})
                if (res.status === 200) {

                    dispatch(getList());

                    dispatch({
                        type: LOADING_MANUFACTURER,
                        payload: false
                    }, () => getList());
                }
                else dispatch({
                    type: LOADING_MANUFACTURER,
                    payload: false
                });
            })
            .catch(() => {

                dispatch({
                    type: LOADING_MANUFACTURER,
                    payload: false
                });

            });
    };
};

export const editManufacturer = (id:any, body:any) => {

    return (dispatch:any) => {

        dispatch({
            type: LOADING_MANUFACTURER,
            payload: {message:"", status:true}
        });

        axiosLocalhost().post(`/api/edit/${id}`, body)
            .then((res:any) => {

                if (res.status === 200) {

                    dispatch(getList());
                    dispatch({
                        type: LOADING_MANUFACTURER,
                        payload: false
                    });
                }
                else dispatch({
                    type: LOADING_MANUFACTURER,
                    payload: false
                });
            })
            .catch(() => {

                dispatch({
                    type: LOADING_MANUFACTURER,
                    payload: false
                });

            });
    };
};

export const deleteManufacturer = (id:any) => {

    return (dispatch:any) => {

        dispatch({
            type: LOADING_MANUFACTURER,
            payload: {message:"", status:true}
        });

        axiosLocalhost().get(`/api/delete/${id}`)
            .then((res:any) => {

                if (res.status === 200) {

                    dispatch(getList());
                    dispatch({
                        type: LOADING_MANUFACTURER,
                        payload: false
                    });
                }
                else dispatch({
                    type: LOADING_MANUFACTURER,
                    payload: false
                });
            })
            .catch(() => {

                dispatch({
                    type: LOADING_MANUFACTURER,
                    payload: false
                });

            });
    };
};