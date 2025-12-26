<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Ticket;

final class TicketController extends AbstractController
{
    #[Route('/api/tickets', name: 'api_tickets_list', methods: ['GET'])]
    public function list(EntityManagerInterface $em, SerializerInterface $serializer): JsonResponse
    {
        $tickets = $em->getRepository(Ticket::class)->findAll();
        $json = $serializer->serialize($tickets, 'json');

        return new JsonResponse($json, 200, [], true);
    }

    #[Route('/api/tickets', name: 'api_ticket_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em, SerializerInterface $serializer): JsonResponse {
        $ticket = $serializer->deserialize($request->getContent(), Ticket::class, 'json');
        $ticket->setCreatedAt(new \DateTime());
        $em->persist($ticket);
        $em->flush();
        $json = $serializer->serialize($ticket, 'json');

        return new JsonResponse($json, 201, [], true);
    }

    #[Route('api/tickets/{id}', name: 'api_ticket_update', methods: ['PATCH'])]
    public function update(int $id, Request $request, EntityManagerInterface $em, SerializerInterface $serializer): JsonResponse {
        $ticket = $em->getRepository(Ticket::class)->find($id);

        if (!$ticket) {
            return new JsonReponse(['error' => 'Ticket not found'], 404);
        }

        // Частичное обновление
        $data = json_decode($request->getContent(), true);

        if (isset($data['status'])) {
            $ticket->setStatus($data['status']);
        }

        if (isset($data['priority'])) {
            $ticket->setPriority($data['priority']);
        }

        if (isset($data['description'])) {
            $ticket->setDescription($data['description']);
        }

        if (isset($data['title'])) {
            $ticket->setTitle($data['title']);
        }

        $em->flush();
        $json = $serializer->serialize($ticket, 'json');

        return new JsonResponse($json, 200, [], true);
    }

    #[Route('api/tickets/{id}', name: 'api_ticket_delete', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $em): JsonResponse {
        $ticket = $em->getRepository(Ticket::class)->find($id);

        if (!$ticket) {
            new ReponseJson(['error' => 'Ticket not found'], 404);
        }

        $em->remove($ticket);
        $em->flush();

        return new ResponseJson(null, 204);
    }
}
