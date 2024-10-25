import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import Contacts from "../controllers/contacts";

const router = Router();

router.post("/search", verifyToken, Contacts.searchContacts);
router.get("/get-contacts-for-dm", verifyToken, Contacts.getContactsForDmList);
router.get("/get-all-contacts", verifyToken, Contacts.getAllContacts);

export default router;
