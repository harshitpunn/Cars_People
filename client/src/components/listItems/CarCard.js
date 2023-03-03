import { useState } from 'react';
import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import RemoveCar from '../buttons/RemoveCar';
import UpdateCar from '../forms/UpdateCar';

const getStyles = () => ({
  card: {
    width: '300px',
    backgroundColor: '#00e5ff',
  },
  list: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const CarCard = (props) => {
  const { id, company, model, year, price, personId, people } = props;
  const styles = getStyles();

  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => setEditMode(!editMode);

  return (
    <>
      {editMode ? (
        <UpdateCar
          id={id}
          company={company}
          model={model}
          year={year}
          price={price}
          personId={personId}
          people={people}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveCar id={id} personId={personId} />,
          ]}
        >
          {company} {model}, {year}, ${price}
        </Card>
      )}
    </>
  );
};

export default CarCard;
