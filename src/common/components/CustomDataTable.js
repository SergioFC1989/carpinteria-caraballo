import { Box, Button, DataTable, Image, Text } from 'grommet';
import { DocumentPdf, Edit, Trash, View } from 'grommet-icons';
import { useEffect, useState } from 'react';
import NotFound from '../assets/not-found.svg';

const CustomDataTable = ({
  data = [],
  schemaTable = [],
  onClickView,
  onClickReport,
  onClickEdit,
  onClickDelete,
  options = {
    view: false,
    report: false,
    export: false,
    edit: false,
    delete: false,
  },
  product,
  actions = false,
  height,
  ...props
}) => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const customColumns = schemaTable.map((columns) => ({
      header: <Text weight="bold">{columns}</Text>,
      property: columns,
      search: columns === 'Fecha' || columns === 'Ref' || columns === 'Detalle',
      align: 'start',
      primary: false,
    }));

    const customActionsProps = [
      {
        pin: true,
        property: 'ACTIONS',
        align: 'center',
        render: () => (
          <Box direction="row" gap="small" justify="center">
            {options.view && (
              <Button title="Ver" icon={<View />} onClick={onClickView} />
            )}
            {options.report && (
              <Button
                title="Informe"
                icon={<DocumentPdf />}
                onClick={onClickReport}
              />
            )}
            {options.edit && (
              <Button
                title="Editar"
                icon={<Edit color="status-information" />}
                onClick={onClickEdit}
              />
            )}
            {options.delete && (
              <Button
                title="Eliminar"
                icon={<Trash color="status-error" />}
                onClick={onClickDelete}
              />
            )}
          </Box>
        ),
      },
    ];
    actions
      ? setColumns(customActionsProps.concat(customColumns))
      : setColumns(customColumns);
  }, [data]);

  return (
    <Box>
      {data.length > 0 ? (
        <Box
          direction="row"
          fill="horizontal"
          border="all"
          justify="center"
          round="small"
        >
          <DataTable
            fill
            data={data}
            columns={columns}
            border={{
              size: 'small',
              body: {
                color: 'light-3',
                side: 'bottom',
              },
            }}
            {...props}
          />
        </Box>
      ) : (
        <Box width="medium" height="medium" alignSelf="center">
          <Image fit="contain" src={NotFound} />
        </Box>
      )}
    </Box>
  );
};

export default CustomDataTable;
