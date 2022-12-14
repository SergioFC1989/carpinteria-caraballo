import PropTypes from 'prop-types';

const propTypeDatum = (Ref, Fecha, Detalle, IVA, Total, Documento, Cliente) => [
  {
    Ref,
    Fecha,
    Detalle,
    IVA,
    Total,
    Documento,
    Cliente,
  },
];

propTypeDatum.propTypes = {
  Ref: PropTypes.number,
  Fecha: PropTypes.string,
  Detalle: PropTypes.string,
  IVA: PropTypes.number,
  Total: PropTypes.number,
  Documento: PropTypes.array,
  Cliente: PropTypes.array,
};

export default propTypeDatum;
