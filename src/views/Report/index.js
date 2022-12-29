import { useContext, useEffect, useState } from 'react';
import { AddCircle, Erase } from 'grommet-icons';
import {
  Box,
  Button,
  FormField,
  Heading,
  Image,
  ResponsiveContext,
  Text,
  TextInput,
} from 'grommet';
import CustomDataTable from '../../common/components/CustomDataTable';
import Layout from '../../common/components/Layout';
import Form from '../../common/components/Form';
import Logo from '../../common/assets/logo.png';

import { schemaColumnsDocument, schemaFormDocument } from '../Form/prop-types';
import useViewData from '../ViewData/useViewData';
import useCommon from '../../common/hooks/useCommon';

const Report = () => {
  const size = useContext(ResponsiveContext);
  const {
    itemDocumentForm,
    setItemDocumentForm,
    isFormDocument,
    navigate,
  } = useViewData();
  const { isShow, handleCommon } = useCommon();
  const [isPrint, setIsPrint] = useState(false);

  useEffect(() => {
    Object.keys(itemDocumentForm).length <= 0 && navigate('/dashboard');
    window.document.title = `${itemDocumentForm.Tipo} - ${itemDocumentForm.Ref} - ${itemDocumentForm.Fecha}: ${itemDocumentForm?.Cliente?.Nombre}_${itemDocumentForm.Detalle}`;
    const allTotal = itemDocumentForm?.Documento.map((elem) => elem.Total);
    console.log(allTotal);
    return () => {
      Object.keys(itemDocumentForm).length <= 0 && window.history.back();
      window.document.title = 'Carpinteria - Antonio Carballo';
    };
  }, [itemDocumentForm]);

  return (
    <Layout>
      <Box
        fill="horizontal"
        direction="row"
        justify="between"
        height={isShow.isEditForm && 'xsmall'}
      >
        <Box>
          <Box width="small" height="small">
            <Image src={Logo} />
          </Box>
        </Box>

        {!isShow.isEditForm && (
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
        )}
        {isShow.isEditForm ? (
          <Box direction="row" gap="small" height="small">
            <FormField required label="Documento" margin="small">
              <TextInput value={itemDocumentForm.Tipo} />
            </FormField>
            <FormField required label="Referencia" margin="small">
              <TextInput
                value={itemDocumentForm.Ref}
                onChange={(e) =>
                  setItemDocumentForm((prev) => ({
                    ...prev,
                    Ref: e.target.value,
                  }))
                }
              />
            </FormField>
            <FormField required label="Fecha" margin="small">
              <TextInput
                value={itemDocumentForm.Fecha}
                onChange={(e) =>
                  setItemDocumentForm((prev) => ({
                    ...prev,
                    Fecha: e.target.value,
                  }))
                }
              />
            </FormField>
          </Box>
        ) : (
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
        )}
      </Box>
      {isShow.isEditForm ? (
        <Box
          pad="small"
          gap="small"
          border="all"
          round="small"
          margin={{ horizontal: 'xsmall' }}
        >
          <Heading margin="none" level={3}>
            Datos del Ciente
          </Heading>
          <Box gap="small" width="large">
            <FormField required label="Nombre">
              <TextInput
                value={itemDocumentForm.Cliente.Nombre}
                onChange={(e) =>
                  setItemDocumentForm((prev) => ({
                    ...prev,
                    Cliente: {
                      ...prev.Cliente,
                      Nombre: e.target.value,
                    },
                  }))
                }
              />
            </FormField>
            <FormField required label="DNI">
              <TextInput
                value={itemDocumentForm.Cliente.DNI}
                onChange={(e) =>
                  setItemDocumentForm((prev) => ({
                    ...prev,
                    Cliente: {
                      ...prev.Cliente,
                      DNI: e.target.value,
                    },
                  }))
                }
              />
            </FormField>
            <FormField required label="Telefono">
              <TextInput
                value={itemDocumentForm.Cliente.Teléfono}
                onChange={(e) =>
                  setItemDocumentForm((prev) => ({
                    ...prev,
                    Cliente: {
                      ...prev.Cliente,
                      Teléfono: e.target.value,
                    },
                  }))
                }
              />
            </FormField>
            <FormField required label="Direccion">
              <TextInput
                value={itemDocumentForm.Cliente.Direccion}
                onChange={(e) =>
                  setItemDocumentForm((prev) => ({
                    ...prev,
                    Cliente: {
                      ...prev.Cliente,
                      Direccion: e.target.value,
                    },
                  }))
                }
              />
            </FormField>
            <FormField required label="Localidad">
              <TextInput
                value={itemDocumentForm.Cliente.Localidad}
                onChange={(e) =>
                  setItemDocumentForm((prev) => ({
                    ...prev,
                    Cliente: {
                      ...prev.Cliente,
                      Localidad: e.target.value,
                    },
                  }))
                }
              />
            </FormField>
          </Box>
        </Box>
      ) : (
        <Box gap="small" pad={!isShow.isEditForm && 'small'}>
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
      )}
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
      {isShow.isEditForm ? (
        <Box pad="small" width="large">
          <FormField required label="Detalle">
            <TextInput
              value={itemDocumentForm.Detalle}
              onChange={(e) =>
                setItemDocumentForm((prev) => ({
                  ...prev,
                  Detalle: e.target.value,
                }))
              }
            />
          </FormField>
        </Box>
      ) : (
        <Box pad="small">
          <Box direction="row" gap="xsmall">
            <Text margin="none">Detalles:</Text>
            <Text margin="none" weight="bold">
              {itemDocumentForm?.Detalle}
            </Text>
          </Box>
        </Box>
      )}
      {isShow.isEditForm && (
        <Box pad="small" gap="small" background="light-1" round="medium">
          <Form
            disabledButton
            direction={size !== 'large' ? 'column' : 'row'}
            schema={schemaFormDocument}
            onClickSubmit={(value) => {
              const addedTotal = {
                ...value,
                Total: (value.Unidad * value.Precio).toFixed(2),
              };
              setItemDocumentForm((prev) => ({
                ...prev,
                Documento: [...prev.Documento, addedTotal],
              }));
            }}
          >
            <Box fill="horizontal" direction="row" gap="medium" justify="end">
              <Button
                icon={<Erase />}
                label="Limpiar"
                onClick={() => {
                  setItemDocumentForm((prev) => ({
                    ...prev,
                    Documento: [],
                  }));
                }}
              />
              <Button icon={<AddCircle />} label="Añadir" type="submit" />
            </Box>
          </Form>
        </Box>
      )}
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
                isFormDocument();
                handleCommon.show({ isEditForm: false });
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
