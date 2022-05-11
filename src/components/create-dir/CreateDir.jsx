import { useState } from 'react';
import { createDir } from '../../actions/file';
import { useSelector, useDispatch } from 'react-redux';

import './create-dir.css';

import AppModal from "../app-modal/AppModal";
import Input from "../input/Input";
import Button from '../button/Button';

export default function CreateFile() {
  const [folderName, setFolderName] = useState("");
  const [createDirModal, setCreateDirModal] = useState(false);
  const dispatch = useDispatch()

  const currentDir = useSelector(state => state.files.currentDir);

  function createFolderHandler() {
    dispatch(createDir(currentDir, folderName));
    setCreateDirModal(false);
  }
  return (
    <div>
      <Button class="btn folder-modal__btn" handleClick={() => setCreateDirModal(true)}>
        Создать папку
      </Button>
      <AppModal value={createDirModal} setValue={setCreateDirModal}>
        <div className="folder-create-modal">
          <h5 className="folder-create-modal__title">Создание папки</h5>
          <Input
            type="text"
            placeholder="Folder name"
            value={folderName}
            setValue={setFolderName}
          />
          <Button
            handleClick={createFolderHandler}
            class="folder-create_button"
          >
            Создать
          </Button>
        </div>
      </AppModal>
    </div>
  );
}
