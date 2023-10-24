import { Customer } from "../models/Customer.js";

// Create a new customer
export const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: "Database error" });
  }
};

// Retrieve all customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Database error" });
  }
};

// Retrieve a specific customer by ID
export const getCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      res.status(404).json({ error: "Customer not found" });
    } else {
      res.json(customer);
    }
  } catch (error) {
    console.error("Error fetching customer by ID:", error);
    res.status(500).json({ error: "Database error" });
  }
};

// Update a customer by ID
export const updateCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Customer.update(req.body, {
      where: { CustomerID: id },
    });
    if (updated) {
      const updatedCustomer = await Customer.findByPk(id);
      res.json(updatedCustomer);
    } else {
      res.status(404).json({ error: "Customer not found" });
    }
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ error: "Database error" });
  }
};

// Delete a customer by ID
export const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Customer.destroy({
      where: { CustomerID: id },
    });
    if (deleted) {
      res.json({ message: "Customer deleted" });
    } else {
      res.status(404).json({ error: "Customer not found" });
    }
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ error: "Database error" });
  }
};
