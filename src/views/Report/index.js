import Layout from '../../common/components/Layout';
import View from './components/View';
import Edit from './components/Edit';

import useCommon from '../../common/hooks/useCommon';

const Report = () => {
  const { isShow } = useCommon();
  return <Layout>{isShow.isEditForm ? <Edit /> : <View />}</Layout>;
};

export default Report;
