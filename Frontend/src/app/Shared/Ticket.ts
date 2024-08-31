export class Ticket {
    id: number = 0; // Unique identifier for the ticket
    title: string = ""; // Title of the ticket
    description: string = ""; // Detailed description of the issue
    status: string = ""; // Current status of the ticket (e.g., 'Open', 'In Progress', 'Closed')
    priority: string = ""; // Priority level of the ticket (e.g., 'Low', 'Medium', 'High', 'Critical')
    createdDate: Date = new Date(); // Date the ticket was created
    updatedDate?: Date = undefined; // Date the ticket was last updated
    assignedUser?: string = ""; // Name or ID of the user assigned to the ticket
    category: string = "";
    reporter: string = ""; // Name or ID of the user who reported the ticket
    resume: string = "";
    star : boolean = false;
  }
  