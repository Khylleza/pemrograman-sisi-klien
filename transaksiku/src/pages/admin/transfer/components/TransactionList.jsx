import TransactionCard from "./TransactionCard";

const TransactionList = ({ data, onDelete, openEditModal }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {data?.map((trx) => (
        <TransactionCard
          key={trx.id}
          trx={trx}
          onDelete={onDelete}
          openEditModal={openEditModal}
        />
      ))}
    </div>
  );
};

export default TransactionList;
