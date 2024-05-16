import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar } from "@mui/material";
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function UserSideBar(props) {
    let router = useRouter();
    return (
        <>
            <div className=" w-80  m-[-8px] p-1 mb-10">
                <List className=" bg-white">
                    {[props.profileName, 'Session Info.', 'Membership Info.', 'Delete Account'].map((text, index) => (
                        <ListItem key={text} disablePadding className=' p-1'>
                            <ListItemButton>
                                <ListItemIcon>{
                                    index === 2 ? <FitnessCenterIcon className="text-black text-2xl" /> :
                                        index === 1 ? <LocalMallIcon className="text-black text-2xl" /> :
                                            index === 3 ? <DeleteIcon className="text-black text-2xl" /> :
                                                <Avatar className="bg-black" src='/avtar.png'></Avatar>}

                                </ListItemIcon>
                                {
                                    index === 0 ? <Link href={"/userdashboard"}> <ListItemText primary={<span className="text-xl font-semibold">{text}</span>} className=" text-black p-3" /> </Link> :
                                       <Link  href ={
                                         index === 1 ? `/userdashboard/${props.mobileNumber}/sessionInfo` : 
                                        index === 2 ? `/userdashboard/${props.mobileNumber}/membershipInfo` :
                                        `/userdashboard/${props.mobileNumber}/deleteAccount`
                                       }> <ListItemText primary={text} className=" text-black" /> </Link>
                                }
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </div>
        </>
    );
}