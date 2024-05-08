import React, { useEffect, useState} from 'react';
import {
    Card,
    Grid,
    CardHeader,
    Typography, TableContainer,
    TableCell,
    Table,
    TableHead,
    TableBody,
    TableRow,
    CardContent
} from '@material-ui/core';
import { postExcelSheet } from 'redux/actions';
import { useDispatch, useSelector } from 'react-redux';




const Excel = () => {
    //const [selectedFile, setSelectedFile] = useState()
    const dispatch = useDispatch();

    const {  postExcelGroupResponse } = useSelector((state) => state.excelData);
    console.log("exceldata", postExcelGroupResponse?.data?.data?.ops);
    
    const handleFileChange = async (event) => {
        try {
            event.preventDefault()
            const formData = new FormData();
            //const newFile = new File([event.target.files[0]], event.target.files[0].name);
            //formData.append('file', newFile);
            formData.append("file", event.target.files[0]);
            console.log("event-----", event.target.files)
            //let name = await postExcelSheet(formData);
            dispatch(postExcelSheet(formData))
            console.log('name--',formData)
           
        } catch (err) {
            console.log("error", err);
        }
    }


    return (
        <>
           

            <Grid container spacing={4} style={{ display: 'flex' }}>
                <Grid className="excelInput ">
                    <div className="excelInput ">
                        <Card>
                            <CardContent>
                    <input className="excelInput"
                                accept=".xlsx,.xls"
                                type="file" onChange={handleFileChange} 
                                />
                            </CardContent>
                        </Card>
                    </div>
                <Grid >

                    <TableContainer >
                        <Table size="small">
                            <TableHead>
                                <TableCell>Authority Id</TableCell>
                                <TableCell>Bloodgroup Id</TableCell>
                                <TableCell>ClientId</TableCell>
                                <TableCell>collection date and time</TableCell>
                                <TableCell>deviceId</TableCell>
                                <TableCell>donation code</TableCell>
                            </TableHead>
                                <TableBody>
                                    {postExcelGroupResponse?.data?.data?.ops.map((data,index) => (
                                  
                                        <TableRow key={index }>
                                            <TableCell>{data.authorityId } </TableCell>

                                            <TableCell>{data.bloodgroupId}</TableCell>

                                            <TableCell>{data.clientId}</TableCell>

                                            <TableCell>{data.collectionDateAndTime}</TableCell>

                                            <TableCell>{data.deviceId}</TableCell>

                                            <TableCell>{data.donationCode}</TableCell>

                                    <TableCell>

                                    </TableCell>
                                </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            
            </Grid>
       </>
        )
}
export default Excel;