import { generatePortal } from "@/actions/generatePortalLink"

function ManageAccountButton() {
  return <form action={generatePortal}>
    <button type="submit">Manage Billing</button>
  </form>
}

export default ManageAccountButton