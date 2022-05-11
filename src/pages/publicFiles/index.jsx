import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getPublicFiles } from "../../actions/file";
import { setCurrentDir } from "../../reducers/file";

import "./public-files.css";
import FileList from "../../components/file-list/FileList";
import Header from "../../components/header/Header";
import Spinner from "../../components/spinner/Spinner";

export default function Disk() {
  const [sort, setSort] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const currentDir = useSelector((state) => state.files.currentDir);
  const {
    location: { search },
  } = history;

  const folder = new URLSearchParams(search).get("folder");

  function sortHandler(event) {
    setSort(event.target.value);
  }
  function searchHandler(event) {
    setSearchText(event.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getPublicFiles(folder, sort, searchText));
      setLoading(false);
      if (folder) {
        folder !== currentDir && dispatch(setCurrentDir(folder));
      } else {
        dispatch(setCurrentDir(""));
      }
    };
    fetchData();
  }, [currentDir, dispatch, folder, sort, searchText]);

  return (
    <div>
      <Header
        isPublicPage={true}
        sort={{ value: sort, handler: sortHandler }}
        search={{ value: searchText, handler: searchHandler }}
      />
      <div>
        {!loading ? (
          <FileList filesPath={"publicFiles"} />
        ) : (
          <LoadingSuspender />
        )}
      </div>
    </div>
  );
}

function LoadingSuspender() {
  return (
    <div>
      <Spinner />
    </div>
  );
}
