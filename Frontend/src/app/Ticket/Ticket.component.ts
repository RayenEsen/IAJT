import { Component, OnInit } from '@angular/core';
import { Ticket } from '../Shared/Ticket';

@Component({
  selector: 'app-Ticket',
  templateUrl: './Ticket.component.html',
  styleUrls: ['./Ticket.component.css']
})
export class TicketComponent implements OnInit {


  MenuItems = [
    {
        label: 'Documents',
        items: [
            {
                label: 'New',
                icon: 'pi pi-plus'
            },
            {
                label: 'Search',
                icon: 'pi pi-search'
            }
        ]
    },
    {
        label: 'Profile',
        items: [
            {
                label: 'Settings',
                icon: 'pi pi-cog'
            },
            {
              label: 'Modifier',
              icon: 'pi pi-eye',
            },
            {
              label: 'Logout',
              icon: 'pi pi-sign-out',
            }
        ]
    }
];

TicketList: Ticket[] = [
  {
    id: 1,
    title: "Login Issue",
    description: "User cannot log into the system.",
    status: "Open",
    priority: "High",
    createdDate: new Date("2024-08-01"),
    updatedDate: new Date("2024-08-05"),
    assignedUser: "John Doe",
    category: "Bug",
    reporter: "Jane Smith",
    resume: "User login failure reported by Jane.",
    star: false
  },
  {
    id: 2,
    title: "Page Load Timeout",
    description: "The dashboard page takes too long to load.",
    status: "In Progress",
    priority: "Medium",
    createdDate: new Date("2024-08-02"),
    updatedDate: new Date("2024-08-06"),
    assignedUser: "Alice Johnson",
    category: "Performance",
    reporter: "Michael Brown",
    resume: "Page loading issue under investigation.",
    star: false
  },
  {
    id: 3,
    title: "Feature Request: Dark Mode",
    description: "Request to add a dark mode to the application.",
    status: "Open",
    priority: "Low",
    createdDate: new Date("2024-08-04"),
    updatedDate: new Date("2024-08-07"),
    assignedUser: "Mohsen",
    category: "Enhancement",
    reporter: "Emily Davis",
    resume: "New feature request for dark mode.",
    star: false
  },
  {
    id: 4,
    title: "Data Sync Error",
    description: "Data is not syncing correctly between systems.",
    status: "Closed",
    priority: "Critical",
    createdDate: new Date("2024-08-04"),
    updatedDate: new Date("2024-08-07"),
    assignedUser: "David Lee",
    category: "Integration",
    reporter: "Sarah White",
    resume: "Resolved sync error between databases.",
    star: false
  },
  {
    id: 5,
    title: "UI Bug on Mobile",
    description: "Buttons are misaligned on mobile devices.",
    status: "Open",
    priority: "Medium",
    createdDate: new Date("2024-08-04"),
    updatedDate: new Date("2024-08-07"),
    assignedUser: "Mark Thompson",
    category: "UI/UX",
    reporter: "Anna Green",
    resume: "UI alignment issue on mobile screens.",
    star: false
  },
  {
    id: 5,
    title: "UI Bug on Mobile",
    description: "Buttons are misaligned on mobile devices.",
    status: "Open",
    priority: "Medium",
    createdDate: new Date("2024-08-04"),
    updatedDate: new Date("2024-08-07"),
    assignedUser: "Mark Thompson",
    category: "UI/UX",
    reporter: "Anna Green",
    resume: "UI alignment issue on mobile screens.",
    star: false
  },
  {
    id: 5,
    title: "UI Bug on Mobile",
    description: "Buttons are misaligned on mobile devices.",
    status: "Open",
    priority: "Medium",
    createdDate: new Date("2024-08-04"),
    updatedDate: new Date("2024-08-07"),
    assignedUser: "Mark Thompson",
    category: "UI/UX",
    reporter: "Anna Green",
    resume: "UI alignment issue on mobile screens.",
    star: false
  },
  {
    id: 5,
    title: "UI Bug on Mobile",
    description: "Buttons are misaligned on mobile devices.",
    status: "Open",
    priority: "Medium",
    createdDate: new Date("2024-08-04"),
    updatedDate: new Date("2024-08-07"),
    assignedUser: "Mark Thompson",
    category: "UI/UX",
    reporter: "Anna Green",
    resume: "UI alignment issue on mobile screens.",
    star: false
  },
  {
    id: 5,
    title: "UI Bug on Mobile",
    description: "Buttons are misaligned on mobile devices.",
    status: "Open",
    priority: "Medium",
    createdDate: new Date("2024-08-04"),
    updatedDate: new Date("2024-08-07"),
    assignedUser: "Mark Thompson",
    category: "UI/UX",
    reporter: "Anna Green",
    resume: "UI alignment issue on mobile screens.",
    star: false
  },
  {
    id: 5,
    title: "UI Bug on Mobile",
    description: "Buttons are misaligned on mobile devices.",
    status: "Open",
    priority: "Medium",
    createdDate: new Date("2024-08-04"),
    updatedDate: new Date("2024-08-07"),
    assignedUser: "Mark Thompson",
    category: "UI/UX",
    reporter: "Anna Green",
    resume: "UI alignment issue on mobile screens.",
    star: false
  },
  {
    id: 5,
    title: "UI Bug on Mobile",
    description: "Buttons are misaligned on mobile devices.",
    status: "Open",
    priority: "Medium",
    createdDate: new Date("2024-08-04"),
    updatedDate: new Date("2024-08-07"),
    assignedUser: "Mark Thompson",
    category: "UI/UX",
    reporter: "Anna Green",
    resume: "UI alignment issue on mobile screens.",
    star: false
  },
];






  constructor() { }

  ngOnInit() {
  }

}
