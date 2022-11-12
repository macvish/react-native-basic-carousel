//
//  RNSimpleCarouselModule.swift
//  RNSimpleCarouselModule
//
//  Copyright © 2022 Macanthony Ahaotu. All rights reserved.
//

import Foundation

@objc(RNSimpleCarouselModule)
class RNSimpleCarouselModule: NSObject {
  @objc
  func constantsToExport() -> [AnyHashable : Any]! {
    return ["count": 1]
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
