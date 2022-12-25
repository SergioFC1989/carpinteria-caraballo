import { useEffect, useState } from 'react';
import { Box, Button, Heading, Image, Text } from 'grommet';
import Layout from '../../common/components/Layout';
import CustomDataTable from '../../common/components/CustomDataTable';
import Logo from '../../common/assets/logo.png';
import useViewData from '../ViewData/useViewData';
import { schemaColumnsDocument } from '../Form/prop-types';

const Report = () => {
  const { itemDocumentForm, setItemDocumentForm, navigate } = useViewData();
  const [isPrint, setIsPrint] = useState(false);

  useEffect(() => {
    console.log(itemDocumentForm);
    Object.keys(itemDocumentForm).length <= 0 && window.history.back();
  }, [itemDocumentForm]);

  return (
    <Layout>
      <Box fill="horizontal" direction="row" justify="between" height="xsmall">
        <Box>
          <Box width="small" height="small">
            <Image src={Logo} />
          </Box>
        </Box>
        <Box justify="end">
          <Box direction="row" gap="xsmall">
            <Text margin="none">NIF:</Text>
            <Text margin="none" weight="bold">
              34004839-Y
            </Text>
          </Box>
          <Box direction="row" gap="xsmall">
            <Text margin="none">Email:</Text>
            <Text margin="none" weight="bold">
              karpichico@hotmail.es
            </Text>
          </Box>
          <Box direction="row" gap="xsmall">
            <Text margin="none">Telefono:</Text>
            <Text margin="none" weight="bold">
              630 881 349
            </Text>
          </Box>
        </Box>
        <Box justify="end">
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
      <Box gap="small" pad="small">
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
        gap="medium"
        direction="row"
        background="light-2"
        justify="end"
        round="small"
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
          <Text margin="none">Total:</Text>
          <Text margin="none" weight="bold">
            {itemDocumentForm?.Total} €
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
    </Layout>
  );
};

export default Report;
