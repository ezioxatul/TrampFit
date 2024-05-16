import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import Popup from "./Popup";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const pages = ["Browse Gym", "Membership", "Partner Login", "User Login"];
const settings = ["Dashboard", "Logout"];

function Navbar() {
  let [response, setResponse] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token) {
      try {
        const option = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        fetch("http://localhost/tokenCheck", option)
          .then(async (res) => {
            let tokenCheck = await res.json();
            if (tokenCheck.response) {
              setResponse(true);
            } else {
              setResponse(false);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      setResponse(false);
    }
  }, []);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState();
  let router = useRouter();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const LogOut = () => {
    setOpen(true);
  };

  const cancel = () => {
    setOpen(false);
  };

  const logoutEvent = () => {
    localStorage.removeItem("token");
    setOpen(false);
    router.push("/");
    setResponse(false);
  };

  const userDashboard = async () => {
    try {
      let token = localStorage.getItem("token");

      const option = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const authCheck = await fetch(
        "http://localhost/userDashboardAuthentication",
        option
      );
      const authCheckResponse = await authCheck.json();

      if (authCheckResponse.response) {
        setTimeout(() => {
          router.push("/userdashboard");
        }, 1000);
      } else {
        localStorage.removeItem("token");
        toast.error(authCheckResponse.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AppBar
      position="sticky"
      className=" bg-white shadow-none bg-opacity-30 backdrop-blur "
    >
      <Container maxWidth="xl" className=" h-20">
        <Toolbar disableGutters>
          {/* <Typography
            variant="h6"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              mt: 1.5
            }}
            className=' text-black'
          >
            <Link href="/">TrampFit</Link>

          </Typography> */}
          <div>
          <Link href="/">
            <Image
              src="/Trampfit-navbar-logo.png" // Path to your image
              alt="Website Logo" // Description of the image for accessibility
              width={200} // Reduced width of the image
              height={50} // Reduced height of the image
            />
          </Link>
          </div>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              onClick={handleOpenNavMenu}
              aria-haspopup="true"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) =>
              page === "User Login" && response ? (
                ""
              ) : (
                <Link
                  onClick={handleCloseNavMenu}
                  href={
                    page === "User Login"
                      ? "/login"
                      : page === "Browse Gym"
                      ? "/browseGym"
                      : page === "Partner Login"
                      ? "/partner/partnerLogin"
                      : `/${page.toLowerCase()}`
                  }
                  key={page}
                  sx={{ color: "grey", display: "block", mt: 2 }}
                  className=" hover:text-green-700 border-none block mt-3 text-gray-400 text-base  mr-10 
                transition ease-in-out delay-3"
                >
                  {page}
                </Link>
              )
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mt: 2 }}>
                {response && <Avatar src="/avtar.png"></Avatar>}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  {setting.toLowerCase() == "logout" ? (
                    <>
                      <Typography textAlign="center" onClick={LogOut}>
                        {setting}
                      </Typography>
                      <Popup
                        key={setting}
                        open={open}
                        title={"Do you Really want to Logout?"}
                        cancel="Cancel"
                        logout="Logout"
                        cancelEvent={cancel}
                        logoutEvent={logoutEvent}
                      />
                    </>
                  ) : (
                    <Typography textAlign="center" onClick={userDashboard}>
                      {setting}
                    </Typography>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <ToastContainer />
    </AppBar>
  );
}
export default Navbar;
