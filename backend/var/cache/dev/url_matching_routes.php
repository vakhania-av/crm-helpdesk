<?php

/**
 * This file has been auto-generated
 * by the Symfony Routing Component.
 */

return [
    false, // $matchHost
    [ // $staticRoutes
        '/api/tickets' => [
            [['_route' => 'api_tickets_list', '_controller' => 'App\\Controller\\TicketController::list'], null, ['GET' => 0], null, false, false, null],
            [['_route' => 'api_ticket_create', '_controller' => 'App\\Controller\\TicketController::create'], null, ['POST' => 0], null, false, false, null],
        ],
    ],
    [ // $regexpList
        0 => '{^(?'
                .'|/_error/(\\d+)(?:\\.([^/]++))?(*:35)'
                .'|/api/tickets/([^/]++)(?'
                    .'|(*:66)'
                .')'
            .')/?$}sDu',
    ],
    [ // $dynamicRoutes
        35 => [[['_route' => '_preview_error', '_controller' => 'error_controller::preview', '_format' => 'html'], ['code', '_format'], null, null, false, true, null]],
        66 => [
            [['_route' => 'api_ticket_update', '_controller' => 'App\\Controller\\TicketController::update'], ['id'], ['PATCH' => 0], null, false, true, null],
            [['_route' => 'api_ticket_delete', '_controller' => 'App\\Controller\\TicketController::delete'], ['id'], ['DELETE' => 0], null, false, true, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];
