import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Layer,
  NameValueList,
  NameValuePair,
  Text,
} from 'grommet';
import FieldSelectSearch from '../../../common/components/FieldSelectSearch';
import { schemaColumnsClient } from '../prop-types';

const ModalClient = ({
  onClickOutside,
  onEsc,
  onClick,
  selectedClient,
  ...props
}) => {
  const [client, setClient] = useState([]);

  useEffect(() => {
    setClient([]);
    Object.keys(selectedClient).length > 0 &&
      Object.entries(selectedClient).forEach(([key, value]) =>
        setClient((prev) => [...prev, { key, value }])
      );
  }, [selectedClient]);

  return (
    <Layer
      onClickOutside={onClickOutside}
      onEsc={onEsc}
      position="right"
      full="vertical"
    >
      <Box pad="medium" gap="small">
        <Heading level={2} margin="none">
          Buscar cliente
        </Heading>
        <FieldSelectSearch label="Cliente" {...props} />
        {selectedClient.Nombre && (
          <Box background="light-2" round="small" pad="small">
            <NameValueList gap="small">
              {schemaColumnsClient.map((col) =>
                client.map(
                  (elem, key) =>
                    col === elem.key && (
                      <NameValuePair key={key.id} name={elem.key}>
                        <Text margin="none" color="text-strong">
                          {elem.value}
                        </Text>
                      </NameValuePair>
                    )
                )
              )}
            </NameValueList>
          </Box>
        )}
        <Box align="center" width="medium">
          <Button
            primary
            fill="horizontal"
            disabled={!selectedClient.Nombre}
            label="Aceptar"
            onClick={onClick}
          />
        </Box>
      </Box>
    </Layer>
  );
};

export default ModalClient;
