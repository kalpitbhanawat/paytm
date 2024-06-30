import Button from '@mui/material/Button';
export default function FormAction({
    handleSubmit,
    type='Button',
    action='submit',
    text
}){
    return(
        <>
        {
            type==='Button' ?
            <>
            <Button variant="contained" onSubmit={handleSubmit} size='small'  type={action}>{text}</Button>
            
            
            </>:
            <></>
        }
        </>
    )
}