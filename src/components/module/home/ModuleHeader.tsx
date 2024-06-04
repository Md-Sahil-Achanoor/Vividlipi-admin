type ModuleHeaderProps = {
  handleModal: () => void;
  title: string;
};

const ModuleHeader = ({ handleModal, title }: ModuleHeaderProps) => {
  return (
    <div className="flex items-center justify-between gao-2 mb-5">
      <h2 className="text-xl font-semibold">{title}</h2>
      <button type="button" onClick={handleModal} className="button_sm_primary">
        Add New
      </button>
    </div>
  );
};

export default ModuleHeader;
