import { useRecoilState } from 'recoil';
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
import CustomDataTable from '../../../common/components/CustomDataTable';
import Layout from '../../../common/components/Layout';
import Form from '../../../common/components/Form';
import Question from '../../../common/components/Question';
import Logo from '../../../common/assets/logo.png';
import {
  schemaColumnsDocument,
  schemaFormDocument,
} from '../../Form/prop-types';
import useViewData from '../../ViewData/useViewData';
import useCommon from '../../../common/hooks/useCommon';
import queryFirestoreAPI from '../../../api/query/firebase-query';
import { stateFetchDatum } from '../../../common/context/common-context';

const Report = () => {
  const size = useContext(ResponsiveContext);
  const { itemDocumentForm, setItemDocumentForm, navigate } = useViewData();
  const { isShow, handleCommon, handleErrors } = useCommon();
  const [itemSelected, setItemSelected] = useState([]);
  const [datum, setDatum] = useRecoilState(stateFetchDatum);

  useEffect(() => {
    Object.keys(itemDocumentForm).length <= 0 && navigate('/dashboard');
    window.document.title = `${itemDocumentForm.Tipo} - ${itemDocumentForm.Ref} - ${itemDocumentForm.Fecha}: ${itemDocumentForm?.Cliente?.Nombre}_${itemDocumentForm.Detalle}`;
    return () => {
      Object.keys(itemDocumentForm).length <= 0 && window.history.back();
      window.document.title = 'Carpinteria - Antonio Carballo';
    };
  }, []);

  useEffect(() => {
    const allTotal = itemDocumentForm?.Documento.map((elem) =>
      Number(elem.Total)
    );
    const totals = allTotal.reduce((acc, val) => acc + val);
    const neto = totals - (itemDocumentForm.IVA * totals) / 100;
    setItemDocumentForm((prev) => ({
      ...prev,
      Total: totals,
      Neto: neto.toFixed(2),
    }));
  }, [itemDocumentForm.Documento]);

  const selectItemTable = (datum) =>
    itemDocumentForm.Documento.filter(
      (item, i) =>
        item === datum &&
        setItemSelected({
          index: i,
          data: datum,
        })
    );

  const deleteItemTable = () => {
    const deletedItem = itemDocumentForm.Documento.filter(
      (elem, i) => i !== itemSelected.index
    );
    setItemDocumentForm((prev) => ({
      ...prev,
      Documento: deletedItem,
    }));
  };

  const onSubmitForm = async () => {
    try {
      await queryFirestoreAPI.UPDATE.DOCUMENT(
        itemDocumentForm.Tipo.toLocaleLowerCase(),
        itemDocumentForm.idFirestore,
        itemDocumentForm
      );
      const filteredData = datum.filter(
        (elem) => elem.idFirestore !== itemDocumentForm.idFirestore
      );
      const updatedData = filteredData.concat(itemDocumentForm);
      setDatum(updatedData);
      handleCommon.show({ isEditForm: false });
      return handleCommon.notification(
        'Enhorabuena',
        'Los datos se registraron correctamente',
        'normal',
        true
      );
    } catch (error) {
      handleCommon.show({ loading: false });
      return handleErrors(error);
    }
  };

  return (
    <>
      {isShow.question && (
        <Question
          message="¿Está seguro de que quiere eliminar los datos de la tabla?"
          onCancel={() => handleCommon.show({ question: false })}
          onSubmit={() => {
            handleCommon.show({ question: false });
            return deleteItemTable();
          }}
        />
      )}
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
        </Box>
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
        <Box pad="small">
          <CustomDataTable
            actions
            options={{ delete: true }}
            schemaTable={schemaColumnsDocument}
            data={itemDocumentForm?.Documento}
            onClickRow={({ datum }) => selectItemTable(datum)}
            onClickDelete={() => handleCommon.show({ question: true })}
          />
        </Box>
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
                handleCommon.show({ isEditForm: false });
                setItemDocumentForm({});
                navigate(`/dashboard/${path[itemDocumentForm.Tipo]}`);
              }}
            />
            <Button
              primary
              fill="horizontal"
              label="Guardar"
              onClick={onSubmitForm}
            />
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default Report;
