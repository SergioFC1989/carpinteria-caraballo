import { useEffect, useState } from 'react';
import { DataTable, Box, Button, Text } from 'grommet';
import { View, DocumentPdf, Edit, Trash } from 'grommet-icons';

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
  ...props
}) => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const customColumns = schemaTable.map((columns) => ({
      header: <Text weight="bold">{columns}</Text>,
      property: columns,
      search: columns === 'Fecha' || columns === 'Ref' || columns === 'Detalle',
      align: 'center',
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
      ? setColumns(customColumns.concat(customActionsProps))
      : setColumns(customColumns);
  }, [data]);

  return (
    <Box
      fill="horizontal"
      height={{ min: 'auto', max: '30.8em' }}
      overflow="auto"
      border="all"
    >
      <DataTable
        pin
        fill="horizontal"
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
  );
};
export default CustomDataTable;
