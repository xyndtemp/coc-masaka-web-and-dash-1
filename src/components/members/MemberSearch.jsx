import { Search } from "lucide-react";
import { Input } from "../ui/input";

const MemberSearch = ({ onChange, disabled }) => (
  <div className="mb-4 flex items-center">
    <Input
      type="text"
      placeholder="Search members..."
      onChange={onChange}
      className="mr-2"
      disabled={disabled}
    />
    <Search className="text-gray-400" />
  </div>
);

export default MemberSearch;