import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { getFiles } from "../../actions/file";
import { setCurrentDir } from "../../reducers/file";

import "./disk.css";
import FileList from "../../components/file-list/FileList";
import Header from "../../components/header/Header";
import Uploader from "../../components/uploader/Uploader";
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
  const fetchData = useCallback(async () => {
    setLoading(true);
    await dispatch(getFiles(folder, sort, searchText));
    setLoading(false);
    if (folder) {
      folder !== currentDir && dispatch(setCurrentDir(folder));
    } else {
      dispatch(setCurrentDir(""));
    }
  }, [dispatch, sort, folder, searchText, currentDir]);

  function sortHandler(event) {
    setSort(event.target.value);
  }
  function searchHandler(event) {
    setSearchText(event.target.value);
  }

  useEffect(() => {
    fetchData();
  }, [currentDir, fetchData]);

  return (
    <div>
      <Header
        sort={{ value: sort, handler: sortHandler }}
        search={{ value: searchText, handler: searchHandler }}
      />
      <div>{!loading ? <FileList /> : <LoadingSuspender />}</div>
      <Uploader />
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
