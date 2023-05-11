import { Box, Button, Heading, Image, Text } from 'grommet';
import { useEffect, useState } from 'react';
import Logo from '../../../common/assets/logo.png';
import CustomDataTable from '../../../common/components/CustomDataTable';

import { schemaColumnsDocument } from '../../Form/prop-types';
import useViewData from '../../ViewData/useViewData';

const Report = () => {
  const { itemDocumentForm, setItemDocumentForm, navigate } = useViewData();
  const [isPrint, setIsPrint] = useState(false);

  const desgIVA = (itemDocumentForm.Total - itemDocumentForm.Neto).toFixed(2);

  useEffect(() => {
    Object.keys(itemDocumentForm).length <= 0 && navigate('/dashboard');
    window.document.title = `${itemDocumentForm.Tipo} - ${itemDocumentForm.Ref} - ${itemDocumentForm.Fecha}: ${itemDocumentForm?.Cliente?.Nombre}_${itemDocumentForm.Detalle}`;
    return () => {
      Object.keys(itemDocumentForm).length <= 0 && window.history.back();
      window.document.title = 'Carpinteria - Antonio Carballo';
    };
  }, []);

  return (
    <>
      <Box
        fill="horizontal"
        direction="row"
        justify="between"
        height="xsmall"
        border={{ side: 'bottom' }}
        pad={{ bottom: 'small' }}
        margin={{ bottom: 'medium' }}
      >
        <Box>
          <Box align="start" width="medium" height="medium">
            <Image style={{ margin: 0 }} fit="contain" src={Logo} />
          </Box>
        </Box>
      </Box>
      <Box align="end">
        <Box justify="start" pad={{ horizontal: 'small' }}>
          <Box direction="row" gap="xsmall">
            <Text margin="none">Documento:</Text>
            <Text margin="none" weight="bold">
              {itemDocumentForm?.Tipo}
            </Text>
          </Box>
          <Box direction="row" gap="xsmall">
            <Text margin="none">Referencia:</Text>
            <Text margin="none" weight="bold">
              {itemDocumentForm?.Ref}
            </Text>
          </Box>
          <Box direction="row" gap="xsmall">
            <Text margin="none">Fecha:</Text>
            <Text margin="none" weight="bold">
              {itemDocumentForm?.Fecha}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box gap="small" pad={{ horizontal: 'small' }}>
        <Heading margin="none" level={3}>
          Datos del Ciente
        </Heading>
        <Box>
          <Box direction="row" gap="xsmall">
            <Text margin="none">Nombre:</Text>
            <Text margin="none" weight="bold">
              {itemDocumentForm?.Cliente?.Nombre}
            </Text>
          </Box>
          <Box direction="row" gap="xsmall">
            <Text margin="none">DNI:</Text>
            <Text margin="none" weight="bold">
              {itemDocumentForm?.Cliente?.DNI}
            </Text>
          </Box>
          <Box direction="row" gap="xsmall">
            <Text margin="none">Telefono:</Text>
            <Text margin="none" weight="bold">
              {itemDocumentForm?.Cliente?.Teléfono}
            </Text>
          </Box>
          <Box direction="row" gap="xsmall">
            <Text margin="none">Direccion:</Text>
            <Text margin="none" weight="bold">
              {itemDocumentForm?.Cliente?.Direccion}
            </Text>
          </Box>
          <Box direction="row" gap="xsmall">
            <Text margin="none">Localidad:</Text>
            <Text margin="none" weight="bold">
              {itemDocumentForm?.Cliente?.Localidad}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box
        pad="small"
        margin="small"
        direction="row"
        background="light-2"
        justify="end"
        round="small"
        gap="medium"
      >
        <Box direction="row" gap="xsmall">
          <Text margin="none">Total Neto:</Text>
          <Text margin="none" weight="bold">
            {itemDocumentForm?.Neto} €
          </Text>
        </Box>
        <Box direction="row" gap="xsmall">
          <Text margin="none">I.V.A:</Text>
          <Text margin="none" weight="bold">
            {itemDocumentForm?.IVA} %
          </Text>
        </Box>
        <Box direction="row" gap="xsmall">
          <Text margin="none">Desglose I.V.A:</Text>
          <Text margin="none" weight="bold">
            {desgIVA} €
          </Text>
        </Box>
        <Box direction="row" gap="xsmall">
          <Text margin="none">Total:</Text>
          <Text margin="none" weight="bold">
            {itemDocumentForm.Total.toFixed(2)} €
          </Text>
        </Box>
      </Box>

      <Box pad="small">
        <Box direction="row" gap="xsmall">
          <Text margin="none">Detalles:</Text>
          <Text margin="none" weight="bold">
            {itemDocumentForm?.Detalle}
          </Text>
        </Box>
      </Box>
      <Box pad="small">
        <CustomDataTable
          height="auto"
          options={{ delete: true }}
          schemaTable={schemaColumnsDocument}
          data={itemDocumentForm?.Documento}
        />
      </Box>
      <Box pad="small">
        <Text margin="none" weight="bold" size="small">
          NUMERO DE CUENTA INGRESOS: ES34 0081 7412 970001480852 SABADELL
        </Text>
      </Box>
      {!isPrint && (
        <Box fill="horizontal" align="center">
          <Box
            pad="small"
            justify="center"
            direction="row"
            gap="small"
            width="large"
          >
            <Button
              secondary
              fill="horizontal"
              label="Cancelar"
              onClick={() => {
                const path = {
                  Facturas: 'bill',
                  Presupuestos: 'budget',
                  Clientes: 'clients',
                };
                navigate(`/dashboard/${path[itemDocumentForm.Tipo]}`);
                setItemDocumentForm({});
              }}
            />
            <Button
              primary
              fill="horizontal"
              label="Imprimir"
              onClick={() => {
                setTimeout(() => setIsPrint(true), 100);
                setTimeout(() => window.print(), 150);
                setTimeout(() => setIsPrint(false), 150);
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Report;
