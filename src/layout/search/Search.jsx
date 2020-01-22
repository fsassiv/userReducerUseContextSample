import React, { useState, useEffect } from "react";
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

const useStyles = makeStyles(theme => ({
  root: {
    height: "50px"
  },
  input: {
    padding: "2px 4px",
    height: "50px"
  }
}));

const Search = () => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [target, setTarget] = useState("artist");
  const [result, setResult] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const handleSearch = async event => {
    if (event) {
      event.preventDefault();
    }

    //clear the previe result
    setResult("");
    //check if the searchValue is not empty
    if (searchValue !== "") {
      const data = await fetchResult({ target, searchValue, page });
      setTotal(data.results["opensearch:totalResults"]);
      if (target === "artist") {
        setResult(data.results.artistmatches);
      }
      if (target === "album") {
        setResult(data.results.albummatches);
      }
    }
  };

  const handleChange = async event => {
    setTarget(event.target.value);
    //reset page to 1
    setPage(1);
  };

  const handlePrevNext = goTo => {
    //make sure it dont go below one
    if (goTo === "prev") {
      if (page > 1) {
        setPage(page - 1);
      }
    }
    if (goTo === "next") {
      setPage(page + 1);
    }
  };

  //update result on target change
  useEffect(() => {
    handleSearch();
  }, [target, page]);

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
      {result !== "" && (
        <SearchList
          listSrc={
            result
            // target === "artist" ? result.artistmatches : result.albummatches
          }
          listType={target === "artist" ? "artist" : "album"}
        />
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
