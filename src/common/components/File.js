/* eslint-disable no-unreachable-loop */
/* eslint-disable no-plusplus */
import { useState } from 'react';
import XLSX from 'xlsx';

import { Box, Button, Heading, FileInput, Notification, Select } from 'grommet';

import Field from './Field';
import LoadSpinner from './LoadSpinner';

const FileUpload = ({ onClickAccept, onClickReturn }) => {
  const [fileUpload, setFileUpload] = useState([]);
  const [wb, setWb] = useState([]);
  const [ws, setWs] = useState([]);
  const [nameSh, setNameSh] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [notification, setNotification] = useState({ state: false });
  const [showSelectedSheet, setShowSelectedSheet] = useState(false);

  // eslint-disable-next-line consistent-return
  const onChangeUpload = (event) => {
    const fileList = event.target.files;
    for (const element of fileList) return setFileUpload(element);
  };

  const onReadBook = () => {
    fileUpload.length <= 0
      ? setNotification({
          state: true,
          title: 'Hemos detectado un error',
          message: 'Debe de seleccionar un archivo',
          status: 'critical',
        })
      : (async () => {
          setShowLoading(true);
          try {
            const data = await fileUpload.arrayBuffer();
            const readBookXlsx = XLSX.readFile(data);
            setWb(readBookXlsx);
            setNameSh(readBookXlsx.SheetNames);
            setShowLoading(false);
            setShowSelectedSheet(true);
          } catch (error) {
            return setNotification({
              state: true,
              title: 'Hemos detectado un error',
              message: error,
              status: 'critical',
            });
          }
          return true;
        })();
  };

  const onReadSheet = () => {
    setShowLoading(true);
    const readSheetXlsx = XLSX.utils.sheet_to_json(wb.Sheets[ws]);
    setShowLoading(false);
    return onClickAccept(readSheetXlsx);
  };

  return (
    <>
      {showLoading && <LoadSpinner />}
      {notification?.state && (
        <Notification
          toast
          title={notification?.title}
          message={notification?.message}
          status={notification?.status}
          onClose={() => setNotification({ state: false })}
        />
      )}
      {!showSelectedSheet ? (
        <Box gap="small" pad="small" fill="horizontal">
          <Heading level={3} margin="none">
            Seleccione un archivo Excel
          </Heading>
          <FileInput
            multiple={false}
            name="file"
            messages={{
              browse: 'Examinar',
              dropPrompt: 'Arrastre y suelte el archivo .xlsx aqui...',
              dropPromptMultiple: 'Arrastre y suelte el archivo .xlsx aqui...',
              remove: 'eliminar',
            }}
            onChange={(event) => onChangeUpload(event)}
          />
          <Box direction="row" gap="medium">
            <Button primary label="Siguiente" onClick={onReadBook} />
            <Button secondary label="Atras" onClick={onClickReturn} />
          </Box>
        </Box>
      ) : (
        <Box gap="small" pad="small">
          <Heading level={3} margin="none">
            Seleccione una hoja del libro
          </Heading>
          <Field width="medium" label="Nombre de la hoja">
            <Select
              options={nameSh}
              value={ws}
              onChange={({ option }) => setWs(option)}
            />
          </Field>
          <Box direction="row" gap="medium">
            {ws.length > 0 && (
              <Button primary label="Aceptar" onClick={onReadSheet} />
            )}
            <Button
              secondary
              label="Atras"
              onClick={() => {
                setNameSh([]);
                setWs([]);
                return setShowSelectedSheet(false);
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};
export default FileUpload;
