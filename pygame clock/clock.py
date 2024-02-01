import pygame
import sys
import math
from pygame.locals import *
import time

pygame.init()

width, height = 400, 400
window = pygame.display.set_mode((width, height))
pygame.display.set_caption("Analog Clock with Numbers")

black = (0, 0, 0)
white = (255, 255, 255)

font = pygame.font.Font(None, 36)
digital_font = pygame.font.Font(None, 36)


def draw_clock():

    current_time = time.localtime()
    hours, minutes, seconds = current_time.tm_hour, current_time.tm_min, current_time.tm_sec

    window.fill(black)

    digital_time = time.strftime("%H:%M:%S")
    digital_text = digital_font.render(digital_time, True, white)
    window.blit(digital_text, (width // 2 - digital_text.get_width() // 2, 20))

    pygame.draw.circle(window, white, (width // 2, height // 2), 150, 2)

    for i in range(1, 13):
        angle = math.radians(i * 30 - 90)
        number_pos = (width // 2 + 120 * math.cos(angle),
                      height // 2 + 120 * math.sin(angle))
        number_text = font.render(str(i), True, white)
        text_rect = number_text.get_rect(center=number_pos)
        window.blit(number_text, text_rect)

    hour_angle = math.radians((hours % 12 + minutes / 60) * 30 - 90)
    hour_hand_length = 80
    pygame.draw.line(window, white, (width // 2, height // 2),
                     (width // 2 + hour_hand_length * math.cos(hour_angle),
                      height // 2 + hour_hand_length * math.sin(hour_angle)), 6)

    minute_angle = math.radians((minutes + seconds / 60) * 6 - 90)
    minute_hand_length = 120
    pygame.draw.line(window, white, (width // 2, height // 2),
                     (width // 2 + minute_hand_length * math.cos(minute_angle),
                      height // 2 + minute_hand_length * math.sin(minute_angle)), 4)

    second_angle = math.radians(seconds * 6 - 90)
    second_hand_length = 140
    pygame.draw.line(window, (255, 0, 0), (width // 2, height // 2),
                     (width // 2 + second_hand_length * math.cos(second_angle),
                      height // 2 + second_hand_length * math.sin(second_angle)), 2)

    pygame.display.update()


while True:
    for event in pygame.event.get():
        if event.type == QUIT:
            pygame.quit()
            sys.exit()

    draw_clock()

    pygame.time.Clock().tick(1)
