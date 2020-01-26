import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Button,
  makeStyles,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Typography
} from "@material-ui/core";
import "./Search.scss";
import fetchResult from "../../api/lastfm";
import SearchList from "./SearchList";
import { saveResultInHistory, getResultFromHistory } from "../../api/history";
import { UserContext } from "../../store/UserContext";
import { HistoryContext } from "../../store/HistoryContext";
import { HistoryActionTypes } from "../../store/actionTypes";

const useStyles = makeStyles(() => ({
  root: {
    height: "50px"
  },
  input: {
    padding: "2px 4px",
    height: "50px"
  }
}));

const Search = () => {
  //get logged user info
  const { userState, userDispatch } = useContext(UserContext);
  const { historyState, historyDispatch } = useContext(HistoryContext);

  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [target, setTarget] = useState("artist");
  const [result, setResult] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState({ error: false, errorMessage: null });

  const handleSearch = async event => {
    if (event) {
      event.preventDefault();
    }

    //check if the searchValue is not empty
    if (searchValue !== "") {
      const { data, error } = await fetchResult({ target, searchValue, page });
      console.log(data);
      if (error.error) {
        setError({ ...error });
      } else {
        setError({ error: false, errorMessage: null });

        setTotal(data.results["opensearch:totalResults"]);
        if (target === "artist") {
          setResult(data.results.artistmatches);
        }
        if (target === "album") {
          setResult(data.results.albummatches);
        }
      }
    }
  };

  const handleChange = async event => {
    setTarget(event.target.value);
    //reset page to 1
    setPage(1);
  };

  const handlePrevNext = goTo => {
    //make sure it doesnt go below one
    if (goTo === "prev") {
      if (page > 1) {
        setPage(page - 1);
      }
    }
    if (goTo === "next") {
      setPage(page + 1);
    }
  };

  //update result on target and page changes
  useEffect(() => {
    //fires a new search after target or page change their values
    handleSearch();

    if (searchValue !== "" && result[target].length > 0) {
      saveResultInHistory({
        userId: userState.user.id,
        resultType: target,
        resultValue: result,
        searchValue
      });
    } else {
      setError({
        error: true,
        errorMessage: `Nenhum resultado encontrato para ${searchValue}`
      });
    }
  }, [page]);

  //update result on result and changes
  useEffect(() => {
    if (searchValue !== "" && result[target].length > 0) {
      saveResultInHistory({
        userId: userState.user.id,
        resultType: target,
        resultValue: result,
        searchValue
      });
    } else {
      setError({
        error: true,
        errorMessage: `Nenhum resultado encontrato para ${searchValue}`
      });
    }
  }, [result]);

  useEffect(() => {
    historyDispatch({
      type: HistoryActionTypes.SET_USER_HISTORY,
      payload: getResultFromHistory(userState.user.id)
    });
    // console.log(getResultFromHistory(userState.user.id));
  }, [page, result, target]);

  return (
    <div className="search">
      <form onSubmit={handleSearch} className="search__form">
        <div className="search__form-ctrl">
          <TextField
            id="outlined-search"
            type="search"
            variant="outlined"
            placeholder="Pesquise.."
            style={{ height: "50px" }}
            className={classes.input}
            onChange={({ target }) => setSearchValue(target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Pesquisar
          </Button>
        </div>
        <div className="search__form-ctrl">
          <FormControl>
            <FormLabel component="legend">Pesquisar por?</FormLabel>
            <RadioGroup
              aria-label="position"
              name="position"
              value={target}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value="artist"
                control={<Radio color="primary" />}
                label="Artista"
                labelPlacement="end"
              />
              <FormControlLabel
                value="album"
                control={<Radio color="primary" />}
                label="Album"
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </form>
      {/* Render results */}
      {!error.error ? (
        <SearchList
          listSrc={result}
          listType={target === "artist" ? "artist" : "album"}
        />
      ) : (
        <p>{error.errorMessage}</p>
      )}
      <div className="search__result-ctrl">
        <Button
          onClick={() => handlePrevNext("prev")}
          color="primary"
          variant="contained"
        >
          Anterior
        </Button>
        <Button
          onClick={() => handlePrevNext("next")}
          color="primary"
          variant="contained"
        >
          Próximo
        </Button>
      </div>
      <Typography style={{ position: "absolute", bottom: "10px" }} variant="h5">
        Total {total}
      </Typography>
    </div>
  );
};

export default Search;
