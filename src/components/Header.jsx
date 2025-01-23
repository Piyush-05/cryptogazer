/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback, useState } from "react";
import { useNavigate, NavLink } from "react-router";
import {
  AppBar,
  Container,
  Toolbar,
  MenuItem,
  Select,
  ThemeProvider,
  createTheme,
  Box,
  styled,
  Typography,
  Menu,
  Button,
} from "@mui/material";
import "../styles/Header.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setCoinList,
  setCoinOverview,
  setError,
  setSelectedCoin,
} from "../utils/cryptoSlice";
import { getCoinList, getCoinOverView } from "../utils/config.http";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";
import MenuIcon from "@mui/icons-material/Menu";
import { navPages } from "../utils/constants";

const NavBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 16,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const MenuNavBox = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    gap: 8,
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: "bold",
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
    fontWeight: "bold",
  },
}));

const Header = () => {
  const navigate = useNavigate();
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const selectedCoin = useSelector((store) => store.crypto.selectedCoin);
  const coinList = useSelector((store) => store.crypto.coinList);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchAllCoins = useCallback(async () => {
    try {
      dispatch(setError({ error: false, msg: "" }));
      const resp = await getCoinList();
      dispatch(setCoinList(resp));
      dispatch(setSelectedCoin(resp[0].id));
    } catch (error) {
      dispatch(setError({ error: true, msg: error.message }));
    }
  }, []);

  const fetchCoinOverview = useCallback(async () => {
    try {
      dispatch(setError({ error: false, msg: "" }));
      const resp = await getCoinOverView(selectedCoin);
      dispatch(setCoinOverview(resp));
    } catch (error) {
      dispatch(setError({ error: true, msg: error.message }));
    }
  }, [selectedCoin]);

  useEffect(() => {
    fetchAllCoins();
  }, []);

  useEffect(() => {
    if (selectedCoin) {
      fetchCoinOverview(selectedCoin);
    }
  }, [selectedCoin]);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar style={{ justifyContent: "space-between", padding: 0 }}>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <MenuNavBox>
                <Button
                  sx={{ padding: 0, minWidth: 0, marginInlineEnd: 1 }}
                  id="basic-button"
                  aria-controls={Boolean(anchorEl) ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={Boolean(anchorEl) ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MenuIcon sx={{ color: "gold" }} />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {navPages.map((page) => {
                    return (
                      <MenuItem onClick={handleClose} key={page.route}>
                        <NavLink
                          to={page.route}
                          style={({ isActive }) => ({
                            color: isActive ? "gold" : "white",
                          })}
                        >
                          <h4>{page.value}</h4>
                        </NavLink>
                      </MenuItem>
                    );
                  })}
                </Menu>
              </MenuNavBox>
              <CurrencyExchangeRoundedIcon sx={{ color: "gold" }} />
              <Title
                variant="h5"
                onClick={() => navigate("/")}
                className="title"
              >
                Cryto Gazers
              </Title>
            </div>
            <NavBox>
              {navPages.map((page) => {
                return (
                  <NavLink
                    key={page.route}
                    to={page.route}
                    style={({ isActive }) => ({
                      color: isActive ? "gold" : "white",
                    })}
                  >
                    <h4>{page.value}</h4>
                  </NavLink>
                );
              })}
            </NavBox>
            <Select
              color="primary"
              variant="outlined"
              labelId={"Crypto Currency"}
              value={selectedCoin}
              onChange={(e) => {
                dispatch(setSelectedCoin(e.target.value));
              }}
              style={{
                width: 150,
                height: 40,
                marginRight: 15,
              }}
            >
              {coinList?.map((coin) => {
                return (
                  <MenuItem key={coin.market_cap_rank} value={coin.id}>
                    {coin.name}
                  </MenuItem>
                );
              })}
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
